export const CONFIGURATION_SSL = [
  {
    id: 1,
    texto: "Generamos la clave privada y el certificado autofirmado.",
    code: "openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes"
  },
  {
    id: 2,
    texto: "Movemos el certificado y la llave a sus carpeta correspondiente en SSL.",
    code: `
      sudo mv cert.pem /etc/ssl/certs/
      sudo mv key.pem /etc/ssl/private/
    `
  },
  {
    id: 3,
    texto: "ahora configuraremos el archivo que permita el acceso por el puerto 443. Nos moveremos a la siguiente carpeta.",
    code: "cd /etc/apache2/sites-available"
  },
  {
    id: 4,
    texto: "Haremos una copia de nuestro archivo tienda.conf",
    code: "sudo cp tienda.conf ./tienda-ssl.conf"
  },
  {
    id: 5,
    texto: "Editaremos el archivo tienda-ssl.conf",
    code: "sudo nano tienda-ssl.conf"
  },
  {
    id: 6,
    texto: "Agregaremos las siguientes instrucciones, tener en cuenta que el puerto se debe cambiar por el 443. ten en cuanta la indicacion colocada donde esta este codigo ${APACHE_LOG_DIR}. ya que en el codigo hay espacios entre el signo de dolar y la llave de apertura, para evitar errores en el momento de desarrollar este website.",
    code: `
      <VirtualHost *:443>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin bryanserver@bryantienda.com
        ServerName www.bryantienda.com
        ServerAlias bryantienda.com
        DocumentRoot /var/www/tienda

        <Directory /var/www/tienda>
                Options Indexes FollowSymLinks
                AllowOverride All
                Require all granted
        </Directory>

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        # Borra el espacio que esta entre el signo de dolar y el 
        # signo de llave en $ {APACHE_LOG_DIR} se dejo separado para evitar
        # errores durante el desarrollo del sitio ya que se desarrollo
        # con Astro y JS.
        ErrorLog $ {APACHE_LOG_DIR}/error.log
        CustomLog $ {APACHE_LOG_DIR}/access.log combined
        
        SSLEngine on
        SSLCertificateFile /etc/ssl/certs/cert.pem
        SSLCertificateKeyFile /etc/ssl/private/key.pem
        
        <FilesMatch "\.(cgi|shtml|phtml|php)">
                SSLOptions +StdEnvVars
        </FilesMatch>
        <Directory /usr/lib/cgi-bin>
                SSLOptions +StdEnvVars
        </Directory>

        BrowserMatch "MSIE [2-6]" \
        nokeepalive ssl-unclean-shutdown \
        downgrade-1.0 force-response-1.0
        BrowserMatch "MSIE" [7-9] ssl-unclean-1.0
        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the     
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
      </VirtualHost>
      # vim: syntax=apache ts=4 sw=4 sts=4 sr noet
    `
  },
  {
    id: 7,
    texto: "Habilitaremos SSL y habilitaremos el sitio con ssl y reiniciaremos apache, ejecuta comando por comando.",
    code: `
      sudo a2ensite ssl
      sudo a3ensite rewrite
      sudo a2ensite tienda-ssl
      sudo systemctl restart apache2
    `
  },
]