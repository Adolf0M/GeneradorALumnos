function obtenerNombreAleatorio() {
  const nombresAnglosajones = [
    "James Alexander", "John William", "Robert Charles", "Michael David", "William Joseph",
    "Richard Thomas", "Daniel James", "Matthew Joseph", "Andrew Michael", "David Benjamin",
    "Christopher Paul", "Joseph Alexander", "Anthony Charles", "Mark Daniel", "Paul Edward",
    "Steven Michael", "George David", "Edward John", "Brian Thomas", "Kevin Andrew",
    "John Robert", "James Michael", "Richard Robert", "Thomas William", "Joseph Richard",
    "Charles Edward", "Daniel Robert", "Matthew John", "Anthony Michael", "David James",
    "Michael Anthony", "William Richard", "James David", "Robert Michael", "John Charles",
    "Richard Daniel", "James Thomas", "John Andrew", "Michael Paul", "William David",
    "Robert John", "Richard James", "Michael Richard", "James William", "John Matthew",
    "William Michael", "David Robert", "Richard Paul", "James Charles", "John Daniel",
    "Michael William", "Robert Thomas", "Richard John", "James Andrew", "William Paul"
  ];

  return nombresAnglosajones[Math.floor(Math.random() * nombresAnglosajones.length)];
}

function obtenerApellidoAleatorio() {
  const apellidosAnglosajones = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson",
    "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin",
    "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee",
    "Walker", "Hall", "Allen", "Young", "King", "Wright", "Scott", "Torres", "Nguyen",
    "Hill", "Adams", "Baker", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner",
    "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Morris",
    "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera", "Cooper",
    "Richardson", "Cox", "Howard", "Ward", "Flores", "Jenkins", "Patterson", "Gonzalez",
    "Morris", "Murray", "Freeman", "Webb", "Wells"
  ];

  return apellidosAnglosajones[Math.floor(Math.random() * apellidosAnglosajones.length)];
}

function generarSQL() {
  let sqlTexto = "INSERT INTO alumnos(matricula, apellido_uno, apellido_dos, nombres, correo) VALUES ";
  for (let i = 1; i <= 20000; i++) {
    const matriculaGenerada = `211${i}`.padStart(8, '0');
    sqlTexto += `(
    ${matriculaGenerada},
    "${obtenerApellidoAleatorio()}",
    "${obtenerApellidoAleatorio()}",
    "${obtenerNombreAleatorio()}",
    "${matriculaGenerada}@uthermosillo.edu.mx"
    )${i === 20000 ? ";" : ","}<br>`;
  }
  document.getElementById("texto").innerHTML = sqlTexto;
}

function descargarArchivoSQL() {
  let sqlQuery = "CREATE DATABASE IF NOT EXISTS sistema_escolar  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci ENGINE InnoDB;\n";
  sqlQuery += "USE sistema_escolar;\n";
  sqlQuery += `CREATE TABLE IF NOT EXISTS alumnos(
    matricula VARCHAR(255) NOT NULL UNIQUE,
    apellido_uno VARCHAR(50) NOT NULL,
    apellido_dos VARCHAR(50) NULL,
    nombres VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL);\n`;
  sqlQuery += document.getElementById("texto").innerHTML.replace(/<br>/g, "");

  const archivoBlob = new Blob([sqlQuery], { type: "text/sql;text/plain;charset=UTF-8" });
  const archivoURL = URL.createObjectURL(archivoBlob);

  // Descargar
  const enlaceDescarga = document.createElement("a");
  enlaceDescarga.href = archivoURL;
  enlaceDescarga.download = "alumnos.sql";
  document.body.appendChild(enlaceDescarga);
  enlaceDescarga.click();
  document.body.removeChild(enlaceDescarga);
  console.log('Descargando archivo SQL...');
}
