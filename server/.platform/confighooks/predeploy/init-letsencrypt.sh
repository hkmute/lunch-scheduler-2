#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

domains=$(/opt/elasticbeanstalk/bin/get-config environment -k DOMAIN)
rsa_key_size=4096
data_path="./data/certbot"
email=$(/opt/elasticbeanstalk/bin/get-config environment -k EMAIL) # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "../current/$data_path" ]; then
  echo "### Copying existing cerbot files ..."
  mkdir -p $data_path
  cp -r ../current/$data_path/* $data_path
fi


if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

debug=$(docker container inspect -f '{{.State.Status}}' current_nginx_1)
echo "[DEBUG] ### ${debug}"
if [ $debug == "running" ]; then
  echo "[DEBUG] ### is running"
fi
if [ $debug != "running" ]; then
  echo "[DEBUG] ### not running"
fi

if [ $(docker container inspect -f '{{.State.Status}}' current_nginx_1) != "running" ]; then
  echo "### Creating dummy certificate for $domains ..."
  path="/etc/letsencrypt/live/$domains"
  mkdir -p "$data_path/conf/live/$domains"
  docker-compose run --rm --entrypoint "\
    openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
      -keyout '$path/privkey.pem' \
      -out '$path/fullchain.pem' \
      -subj '/CN=localhost'" certbot
  echo

  echo "### Starting nginx ..."
  docker-compose up --force-recreate -d nginx
  echo

  echo "### Deleting dummy certificate for $domains ..."
  docker-compose run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$domains && \
    rm -Rf /etc/letsencrypt/archive/$domains && \
    rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
  echo


  echo "### Requesting Let's Encrypt certificate for $domains ..."
  #Join $domains to -d args
  domain_args=""
  for domain in "${domains[@]}"; do
    domain_args="-d $domain $domain_args"
  done

  # Select appropriate email arg
  case "$email" in
    "") email_arg="--register-unsafely-without-email" ;;
    *) email_arg="--email $email" ;;
  esac

  # Enable staging mode if needed
  if [ $staging != "0" ]; then staging_arg="--staging"; fi

  docker-compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      $staging_arg \
      $email_arg \
      $domain_args \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --force-renewal" certbot
  echo

  echo "### Clean up temp docker containers ..."
  docker-compose down
fi
# echo "### Reloading nginx ..."
# docker-compose exec nginx nginx -s reload