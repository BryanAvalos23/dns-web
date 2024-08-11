export const INSTALL = [
  {
    id: 1,
    texto: "Actualizamos el sistema.",
    code: "sudo apt update"
  },
  {
    id: 2,
    texto: "Instalamos Bind",
    code: "sudo apt install bind9"
  },
]

export const CONFIGURATIONS = [
  {
    id: 1,
    texto: "Nos movemos a la carpeta de bind",
    code: "cd etc/bind/"
  },
  {
    id: 2,
    texto: "Editaremos el archivo named.conf.local",
    code: "sudo nano named.conf.local"
  },
  {
    id: 3,
    texto: "Dentro del archivo crearemos la zona directa y zona inversa.",
    code: `
      # Zona directa
      zone "bryanavalos.com" IN {
        type master;
        file "etc/bind/zonas/db.tienda.local";
      }

      # Zona inversa
      zone "1.168.192.in-addr.arpa" IN {
        type master;
        file "etc/bind/zonas/db.192"
      }
    `
  },
  {
    id: 4,
    texto: "Aun no tenes los archivos de cada zona, crearemos el directorio y copiaremos los archivos.",
    code: "mkdir zonas"
  },
  {
    id: 5,
    texto: "Copiaremos el archivo que necesitamos para comenzar la configuracion de la zona directa.",
    code: "sudo cp db.local ./zonas/db.tienda.local"
  },
  {
    id: 6,
    texto: "Editaremos el archivo db.tienda.local",
    code: "sudo nano db.tienda.local"
  },
  {
    id: 7,
    texto: "El codigo de configuracion es el siguiente",
    code: `
      ; BIND data file for local loopback interface
      ;
      $TTL    604800
      @       IN      SOA     bryan.bryantienda.com. root.bryantienda.com. (
                                    2         ; Serial
                              604800         ; Refresh
                                86400         ; Retry
                              2419200         ; Expire
                              604800 )       ; Negative Cache TTL
      ;
      @       IN      NS      bryan.bryantienda.com.
      bryan   IN      A       192.168.1.21
      @       IN      A       192.168.1.20
      www     IN      CNAME   bryan.bryantienda.com.
    `
  },
  {
    id: 8,
    texto: "Ahora copiaremos el archivo para la zona inversa.",
    code: "sudo cp ./db.tienda.local ./db.192"
  },
  {
    id: 9,
    texto: "Editaremos el archivo db.192",
    code: "sudo nano db.192"
  },
  {
    id: 10,
    texto: "El codigo de configuracion es el siguiente.",
    code: `
      ; BIND data file for local loopback interface
      ;
      $TTL    604800
      @       IN      SOA     bryan.bryantienda.com. root.bryantienda.com. (
                                    2         ; Serial
                              604800         ; Refresh
                                86400         ; Retry
                              2419200         ; Expire
                              604800 )       ; Negative Cache TTL
      ;
      @       IN      NS      bryan.bryantienda.com.
      bryan   IN      A       192.168.1.21
      20      IN      PTR     bryan.bryantienda.com
    `
  },
  {
    id: 11,
    texto: "Reiniciaremos bind para que los cambios se guarden.",
    code: "sudo systemctl restart bind9"
  },
  {
    id: 12,
    texto: "Verificamos que los named funcionen corretamente",
    code: "sudo named-checkconf"
  },
  {
    id: 13,
    texto: "Verificamos que los archivos de zona funcionen correctamente.",
    code: `
      # ejecutar linea por linea
      sudo named-checkzone bryanavalos.com /etc/bind/db.tienda.local
      sudo named-checkzone 1.168.192.in-addr.arpa /etc/bind/db.192
    `
  },
]