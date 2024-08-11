export const SITIO = [
  {
    id: 1,
    texto: "Nos movemos donde alojaremos nuestro sitio extraido de github /var/www",
    code: "cd /var/www"
  },
  {
    id: 2,
    texto: "Clonamos el repositorio.",
    code: "git clone https://github.com/BryanAvalos23/carrito-university.git"
  },
  {
    id: 3,
    texto: "Cambiamos el nombre a nuestro gusto, en este caso se llamara tienda.",
    code: "sudo mv carrito-tienda tienda"
  },
]

export const INSTALL = [
  {
    id: 1,
    texto: "Actualizamos el sistema.",
    code: "sudo apt update",
  },
  {
    id: 2,
    texto: "Instalamos apache.",
    code: "sudo apt install apache2",
  },
];

export const CONFIGURATION = [
  {
    id: 1,
    texto: "Nos movemos a la carpeta de apache.",
    code: "cd /etc/apache2/sites-available",
  },
  {
    id: 2,
    texto: "Copiamos el archivo default para personalizarlo a lo que necesitamos",
    code: "sudo cp 000-default.conf tienda.conf",
  },
  {
    id: 3,
    texto: "Editaremos el archivo agregando nuestras configuraciones",
    code: "sudo nano tienda.conf",
  },
  {
    id: 4,
    texto: "El siguiente codigo hay que agregarlo en nuestro archivo, haremos una prueba que sea solo ingresando por IP como una manera de testear, ten en cuanta la indicacion colocada donde esta este codigo ${APACHE_LOG_DIR}.",
    code: `
      <VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin bryanserver@bryantienda.com
        ServerName tu_ip
        DocumentRoot /var/www/tienda

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

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
      </VirtualHost> 
    `,
  },
  {
    id: 5,
    texto: "Ahora activamos nuestro archivo de configuracion que habilitara el sitio web.",
    code: "sudo a2ensite tienda.conf",
  },
  {
    id: 6,
    texto: "Reiniciamos Apache.",
    code: "sudo systemctl restart apache2",
  },
]

export const CONFIGURATION_WITH_DNS = [
  {
    id: 1,
    texto: "Teniendo en cuenta que estamos en el directorio de apache, editaremos el archivo de configuracion de sitio.",
    code: "sudo nano tienda.conf"
  },
  {
    id: 2,
    texto: "Realizaremos estos cambios en nuestro archivo, ten en cuenta la indicacion ubicada donde esta el codigo de ${APACHE_LOG_DIR}.",
    code: `
      <VirtualHost *:80>
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

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
      </VirtualHost>
    `
  },
  {
    id: 3,
    texto: "Teniendo estos cambios, Habilitamos el sitio de nuevo.",
    code: "sudo a2ensite tienda.conf"
  },
  {
    id: 4,
    texto: "Reiniciamos apache.",
    code: "sudo systemctl restart apache2"
  },

]