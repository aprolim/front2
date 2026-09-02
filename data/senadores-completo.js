// data/senadores.js
const generarSlug = (nombre) => {
  if (!nombre) return ''
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const senadores = [
  // ============================================ //
  // ================= CHUQUISACA =============== //
  // ============================================ //
  // TITULARES
  { 
    id: 1, seatNumber: 1, 
    name: "Bertha Cartagena Sánchez", 
    slug: generarSlug("Bertha Cartagena Sánchez"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Chuquisaca", 
    comision: "Comité de Culturas, Interculturalidad y Patrimonio Cultural", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g1/BERTHA CARTAGENA SANCHEZ.png",
    esTitular: true,
    suplente: "Manfred Leo Perez Hassenteufel",
    slugSuplente: generarSlug("Manfred Leo Perez Hassenteufel"),
    fotoSuplente: "/senadores/suplentes/g1/MANFRED LEO PEREZ HASSENTEUFEL.png"
  },
  { 
    id: 2, seatNumber: 2, 
    name: "Daniel Antonio Ortiz Velásquez", 
    slug: generarSlug("Daniel Antonio Ortiz Velásquez"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Chuquisaca", 
    comision: "Comisión de Constitución, Derechos Humanos, Legislación y Sistema Electoral", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g1/DANIEL ANTONIO ORTIZ VELASQUEZ.png",
    esTitular: true,
    suplente: "Reina Isabel Pallares Morales",
    slugSuplente: generarSlug("Reina Isabel Pallares Morales"),
    fotoSuplente: "/senadores/suplentes/g1/REINA ISABEL PALLARES MORALES.png"
  },
  { 
    id: 3, seatNumber: 3, 
    name: "Tomasa Yarhui Jacome", 
    slug: generarSlug("Tomasa Yarhui Jacome"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Chuquisaca", 
    comision: "Comité de Sistema Electoral, Derechos Humanos y Equidad Social", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g1/TOMASA YARHUI JACOME.png",
    esTitular: true,
    suplente: "Hugo Marcelo Cortez Calvimontes",
    slugSuplente: generarSlug("Hugo Marcelo Cortez Calvimontes"),
    fotoSuplente: "/senadores/suplentes/g1/HUGO MARCELO CORTEZ CALVIMONTES.png"
  },
  { 
    id: 4, seatNumber: 4, 
    name: "Abdon Porcel Arancibia", 
    slug: generarSlug("Abdon Porcel Arancibia"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Chuquisaca", 
    comision: "Comité de Políticas Financiera, Monetaria, Tributaria y Seguros", 
    cargo: "Secretario de Comite",
    foto: "/senadores/titulares/g1/ABDON PORCEL ARANCIBIA.png",
    esTitular: true,
    suplente: "Ilse Fatima Davila Arancibia",
    slugSuplente: generarSlug("Ilse Fatima Davila Arancibia"),
    fotoSuplente: "/senadores/suplentes/g1/ILSE FATIMA DAVILA ARANCIBIA.png"
  },
  // SUPLENTES (no se muestran como tarjetas independientes, solo como suplentes)
  // Pero para que el filtro funcione, los agregamos como senadores también
  { 
    id: 5, seatNumber: 5, 
    name: "Manfred Leo Perez Hassenteufel", 
    slug: generarSlug("Manfred Leo Perez Hassenteufel"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Chuquisaca", 
    foto: "/senadores/suplentes/g1/MANFRED LEO PEREZ HASSENTEUFEL.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 6, seatNumber: 6, 
    name: "Reina Isabel Pallares Morales", 
    slug: generarSlug("Reina Isabel Pallares Morales"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Chuquisaca", 
    foto: "/senadores/suplentes/g1/REINA ISABEL PALLARES MORALES.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 7, seatNumber: 7, 
    name: "Hugo Marcelo Cortez Calvimontes", 
    slug: generarSlug("Hugo Marcelo Cortez Calvimontes"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Chuquisaca", 
    foto: "/senadores/suplentes/g1/HUGO MARCELO CORTEZ CALVIMONTES.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 8, seatNumber: 8, 
    name: "Ilse Fatima Davila Arancibia", 
    slug: generarSlug("Ilse Fatima Davila Arancibia"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Chuquisaca", 
    foto: "/senadores/suplentes/g1/ILSE FATIMA DAVILA ARANCIBIA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },

  // ============================================ //
  // ================= LA PAZ =================== //
  // ============================================ //
  // TITULARES
  { 
    id: 9, seatNumber: 9, 
    name: "Nicanor Gonzalo Cochi Condorí", 
    slug: generarSlug("Nicanor Gonzalo Cochi Condorí"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "La Paz", 
    comision: "Comisión de Política Internacional y Protección al Migrante", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g1/NICANOR GONZALO COCHI CONDORI.png",
    esTitular: true,
    suplente: "Roxana Mamani Colquehuanca",
    slugSuplente: generarSlug("Roxana Mamani Colquehuanca"),
    fotoSuplente: "/senadores/suplentes/g1/ROXANA MAMANI COLQUEHUANCA.png"
  },
  { 
    id: 10, seatNumber: 10, 
    name: "Ana María Crispin Choque", 
    slug: generarSlug("Ana María Crispin Choque"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "La Paz", 
    comision: "Comisión de Economía Plural, Producción e Industria", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g1/ANA MARIA CRISPIN CHOQUE.png",
    esTitular: true,
    suplente: "Victor Severo Quispe Santander",
    slugSuplente: generarSlug("Victor Severo Quispe Santander"),
    fotoSuplente: "/senadores/suplentes/g1/VICTOR SEVERO QUISPE SANTANDER.png"
  },
  { 
    id: 11, seatNumber: 11, 
    name: "José Manuel Ormachea Mendieta", 
    slug: generarSlug("José Manuel Ormachea Mendieta"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "La Paz", 
    comision: "Comisión de Naciones y Pueblos Indígena Originario Campesinos, Culturas e Interculturalidad", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g1/JOSE MANUEL ORMACHEA MENDIETA.png",
    esTitular: true,
    suplente: "Maria Elena Pachacute Ticona",
    slugSuplente: generarSlug("Maria Elena Pachacute Ticona"),
    fotoSuplente: "/senadores/suplentes/g1/MARIA ELENA PACHACUTE TICONA.png"
  },
  { 
    id: 12, seatNumber: 12, 
    name: "Carmen Soledad Chapeton Tancara", 
    slug: generarSlug("Carmen Soledad Chapeton Tancara"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "La Paz", 
    comision: "Directiva Legislatura 2025-2026", 
    cargo: "Primera Vicepresidencia",
    foto: "/senadores/titulares/g1/CARMEN SOLEDAD CHAPETÓN TANCARA.png",
    esTitular: true,
    suplente: "Nilton Condori Alanoca",
    slugSuplente: generarSlug("Nilton Condori Alanoca"),
    fotoSuplente: "/senadores/suplentes/g1/NILTON CONDORI ALANOCA.png"
  },
  // SUPLENTES
  { 
    id: 13, seatNumber: 13, 
    name: "Roxana Mamani Colquehuanca", 
    slug: generarSlug("Roxana Mamani Colquehuanca"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "La Paz", 
    foto: "/senadores/suplentes/g1/ROXANA MAMANI COLQUEHUANCA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 14, seatNumber: 14, 
    name: "Victor Severo Quispe Santander", 
    slug: generarSlug("Victor Severo Quispe Santander"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "La Paz", 
    foto: "/senadores/suplentes/g1/VICTOR SEVERO QUISPE SANTANDER.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 15, seatNumber: 15, 
    name: "Maria Elena Pachacute Ticona", 
    slug: generarSlug("Maria Elena Pachacute Ticona"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "La Paz", 
    foto: "/senadores/suplentes/g1/MARIA ELENA PACHACUTE TICONA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 16, seatNumber: 16, 
    name: "Nilton Condori Alanoca", 
    slug: generarSlug("Nilton Condori Alanoca"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "La Paz", 
    foto: "/senadores/suplentes/g1/NILTON CONDORI ALANOCA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },

  // ============================================ //
  // ================ COCHABAMBA ================ //
  // ============================================ //
  // TITULARES
  { 
    id: 17, seatNumber: 17, 
    name: "Wilder Véliz Armas", 
    slug: generarSlug("Wilder Véliz Armas"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Cochabamba", 
    comision: "Comité de Justicia Plural y Consejo de la Magistratura.", 
    cargo: "Secretario de Comite",
    foto: "/senadores/titulares/g1/WILDER VELIZ ARMAS.png",
    esTitular: true,
    suplente: "Lenny Mayra Ayala Justiniano",
    slugSuplente: generarSlug("Lenny Mayra Ayala Justiniano"),
    fotoSuplente: "/senadores/suplentes/g1/LENNY MAYRA AYALA JUSTINIANO.png"
  },
  { 
    id: 18, seatNumber: 18, 
    name: "Judith Rosario García Coca", 
    slug: generarSlug("Judith Rosario García Coca"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Cochabamba", 
    comision: "Comisión de Seguridad del Estado", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g1/JUDITH ROSARIO GARCIA COCA.png",
    esTitular: true,
    suplente: "Royer Ivan Mamani Garcia",
    slugSuplente: generarSlug("Royer Ivan Mamani Garcia"),
    fotoSuplente: "/senadores/suplentes/g1/ROYER IVAN MAMANI GARCIA.png"
  },
  { 
    id: 19, seatNumber: 19, 
    name: "Wanda Ximena Medrano Hervas", 
    slug: generarSlug("Wanda Ximena Medrano Hervas"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Cochabamba", 
    comision: "Comité de Relaciones Económicas Internacionales", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g1/WANDA XIMENA MEDRANO HERVAS.png",
    esTitular: true,
    suplente: "Aldo Sergio Villegas Mora",
    slugSuplente: generarSlug("Aldo Sergio Villegas Mora"),
    fotoSuplente: "/senadores/suplentes/g1/ALDO SERGIO VILLEGAS MORA.png"
  },
  { 
    id: 20, seatNumber: 20, 
    name: "Claudia Mallón Vargas", 
    slug: generarSlug("Claudia Mallón Vargas"),
    party: "Autonomía para Bolivia Súmate", 
    partyShort: "SUMATE", 
    partyColor: "#611789", 
    department: "Cochabamba", 
    comision: "Comité de Vivienda, Regimen Laboral, Seguridad Industrial y Seguridad Social", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g1/CLAUDIA MALLON VARGAS.png",
    esTitular: true,
    suplente: "Apolinar Rivera Muñoz",
    slugSuplente: generarSlug("Apolinar Rivera Muñoz"),
    fotoSuplente: "/senadores/suplentes/g1/APOLINAR RIVERA MUÑOZ.png"
  },
  // SUPLENTES
  { 
    id: 21, seatNumber: 21, 
    name: "Lenny Mayra Ayala Justiniano", 
    slug: generarSlug("Lenny Mayra Ayala Justiniano"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Cochabamba", 
    foto: "/senadores/suplentes/g1/LENNY MAYRA AYALA JUSTINIANO.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 22, seatNumber: 22, 
    name: "Royer Ivan Mamani Garcia", 
    slug: generarSlug("Royer Ivan Mamani Garcia"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Cochabamba", 
    foto: "/senadores/suplentes/g1/ROYER IVAN MAMANI GARCIA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 23, seatNumber: 23, 
    name: "Aldo Sergio Villegas Mora", 
    slug: generarSlug("Aldo Sergio Villegas Mora"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Cochabamba", 
    foto: "/senadores/suplentes/g1/ALDO SERGIO VILLEGAS MORA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 24, seatNumber: 24, 
    name: "Apolinar Rivera Muñoz", 
    slug: generarSlug("Apolinar Rivera Muñoz"),
    party: "Autonomía para Bolivia Súmate", 
    partyShort: "SUMATE", 
    partyColor: "#611789", 
    department: "Cochabamba", 
    foto: "/senadores/suplentes/g1/APOLINAR RIVERA MUÑOZ.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },

  // ============================================ //
  // ================= ORURO ==================== //
  // ============================================ //
  // TITULARES
  { 
    id: 25, seatNumber: 25, 
    name: "Yasmín Estivariz Villarroel", 
    slug: generarSlug("Yasmín Estivariz Villarroel"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Oruro", 
    comision: "Directiva Legislatura 2025-2026", 
    cargo: "Primera Secretaria",
    foto: "/senadores/titulares/g2/YASMIN ESTIVARIZ VILLARROEL.png",
    esTitular: true,
    suplente: "Ramiro Mamani Ramirez",
    slugSuplente: generarSlug("Ramiro Mamani Ramirez"),
    fotoSuplente: "/senadores/suplentes/g2/RAMIRO MAMANI RAMIREZ.png"
  },
  { 
    id: 26, seatNumber: 26, 
    name: "Freddy Castillo Chávez", 
    slug: generarSlug("Freddy Castillo Chávez"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Oruro", 
    comision: "Comité de Constitución, Legislación e Interpretación Legislativa y Constitucional.", 
    cargo: "Secretario de Comite",
    foto: "/senadores/titulares/g2/FREDDY CASTILLO CHAVEZ.png",
    esTitular: true,
    suplente: "Villma Colque Camacho",
    slugSuplente: generarSlug("Villma Colque Camacho"),
    fotoSuplente: "/senadores/suplentes/g2/VILLMA COLQUE CAMACHO.png"
  },
  { 
    id: 27, seatNumber: 27, 
    name: "Maria Antonieta Alcón Sánchez", 
    slug: generarSlug("Maria Antonieta Alcón Sánchez"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Oruro", 
    comision: "Comité de Educación, Salud, Ciencia, Tecnología y Deporte", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g2/MARIA ANTONIETA ALCON SANCHEZ.png",
    esTitular: true,
    suplente: "Edwin Lopez Quiroga",
    slugSuplente: generarSlug("Edwin Lopez Quiroga"),
    fotoSuplente: "/senadores/suplentes/g2/EDWIN LOPEZ QUIROGA.png"
  },
  { 
    id: 28, seatNumber: 28, 
    name: "José Sánchez Aguilar", 
    slug: generarSlug("José Sánchez Aguilar"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Oruro", 
    comision: "Comisión de Política Social", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g2/JOSE SANCHEZ AGUILAR.png",
    esTitular: true,
    suplente: "Cinthya Inga Gutierrez Guzman",
    slugSuplente: generarSlug("Cinthya Inga Gutierrez Guzman"),
    fotoSuplente: "/senadores/suplentes/g2/CINTHYA INGA GUTIERREZ GUZMAN.png"
  },
  // SUPLENTES
  { 
    id: 29, seatNumber: 29, 
    name: "Ramiro Mamani Ramirez", 
    slug: generarSlug("Ramiro Mamani Ramirez"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Oruro", 
    foto: "/senadores/suplentes/g2/RAMIRO MAMANI RAMIREZ.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 30, seatNumber: 30, 
    name: "Villma Colque Camacho", 
    slug: generarSlug("Villma Colque Camacho"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Oruro", 
    foto: "/senadores/suplentes/g2/VILLMA COLQUE CAMACHO.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 31, seatNumber: 31, 
    name: "Edwin Lopez Quiroga", 
    slug: generarSlug("Edwin Lopez Quiroga"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Oruro", 
    foto: "/senadores/suplentes/g2/EDWIN LOPEZ QUIROGA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 32, seatNumber: 32, 
    name: "Cinthya Inga Gutierrez Guzman", 
    slug: generarSlug("Cinthya Inga Gutierrez Guzman"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Oruro", 
    foto: "/senadores/suplentes/g2/CINTHYA INGA GUTIERREZ GUZMAN.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },

  // ============================================ //
  // ================= POTOSÍ =================== //
  // ============================================ //
  // TITULARES
  { 
    id: 33, seatNumber: 33, 
    name: "Bertha Nurmy Gutiérrez Meneses", 
    slug: generarSlug("Bertha Nurmy Gutiérrez Meneses"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Potosí", 
    comision: "Comité de Naciones y Pueblos Indígena Originario Campesinos", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g2/BERTHA NURMY GUTIERREZ MENESES.png",
    esTitular: true,
    suplente: "Freddy Rioja Melgar",
    slugSuplente: generarSlug("Freddy Rioja Melgar"),
    fotoSuplente: "/senadores/suplentes/g2/FREDDY RIOJA MELGAR.png"
  },
  { 
    id: 34, seatNumber: 34, 
    name: "Marcelino Flores Ordoñez", 
    slug: generarSlug("Marcelino Flores Ordoñez"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Potosí", 
    comision: "Comité de Energía, Hidrocarburos, Minería y Metalurgia", 
    cargo: "Secretario de Comite",
    foto: "/senadores/titulares/g2/MARCELINO FLORES ORDOÑEZ.png",
    esTitular: true,
    suplente: "Susana Gabriela Ruiz Zuleta",
    slugSuplente: generarSlug("Susana Gabriela Ruiz Zuleta"),
    fotoSuplente: "/senadores/suplentes/g2/SUSANA GABRIELA RUIZ ZULETA.png"
  },
  { 
    id: 35, seatNumber: 35, 
    name: "Teresa Alarcón Arana", 
    slug: generarSlug("Teresa Alarcón Arana"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Potosí", 
    comision: "Comité de Asuntos Exteriores Interpelatorios y Organismos Internacionales", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g2/TERESA ALARCON ARANA.png",
    esTitular: true,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 36, seatNumber: 36, 
    name: "Betty Canaviri Villanueva", 
    slug: generarSlug("Betty Canaviri Villanueva"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Potosí", 
    comision: "Comité de Economía Plural, Desarrollo Productivo, Obras Públicas e Infraestructura", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g2/BETTY CANAVIRI VILLANUEVA.png",
    esTitular: true,
    suplente: "Roger Mamani Coronado",
    slugSuplente: generarSlug("Roger Mamani Coronado"),
    fotoSuplente: "/senadores/suplentes/g2/ROGER MAMANI CORONADO.png"
  },
  // SUPLENTES
  { 
    id: 37, seatNumber: 37, 
    name: "Freddy Rioja Melgar", 
    slug: generarSlug("Freddy Rioja Melgar"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Potosí", 
    foto: "/senadores/suplentes/g2/FREDDY RIOJA MELGAR.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 38, seatNumber: 38, 
    name: "Susana Gabriela Ruiz Zuleta", 
    slug: generarSlug("Susana Gabriela Ruiz Zuleta"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Potosí", 
    foto: "/senadores/suplentes/g2/SUSANA GABRIELA RUIZ ZULETA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 39, seatNumber: 39, 
    name: "Roger Mamani Coronado", 
    slug: generarSlug("Roger Mamani Coronado"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Potosí", 
    foto: "/senadores/suplentes/g2/ROGER MAMANI CORONADO.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },

  // ============================================ //
  // ================= TARIJA =================== //
  // ============================================ //
  // TITULARES
  { 
    id: 40, seatNumber: 40, 
    name: "Diego Esteban Mateo Ávila Navajas", 
    slug: generarSlug("Diego Esteban Mateo Ávila Navajas"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Tarija", 
    comision: "Directiva Legislatura 2025-2026", 
    cargo: "Presidente del Senado",
    foto: "/senadores/titulares/g2/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png",
    esTitular: true,
    suplente: "Luzmaya Zelaya Vega",
    slugSuplente: generarSlug("Luzmaya Zelaya Vega"),
    fotoSuplente: "/senadores/suplentes/g2/LUZMAYA ZELAYA VEGA.png"
  },
  { 
    id: 41, seatNumber: 41, 
    name: "Maria Isabel Moreno Cortez", 
    slug: generarSlug("Maria Isabel Moreno Cortez"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Tarija", 
    comision: "Comité de Ministerio Público y Defensa Legal del Estado", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g2/MARIA ISABEL MORENO CORTEZ.png",
    esTitular: true,
    suplente: "Rolando Vacaflor Gabriel Arana",
    slugSuplente: generarSlug("Rolando Vacaflor Gabriel Arana"),
    fotoSuplente: "/senadores/suplentes/g2/ROLANDO VACAFLOR GABRIEL ARANA.png"
  },
  { 
    id: 42, seatNumber: 42, 
    name: "César Mentasti Padilla", 
    slug: generarSlug("César Mentasti Padilla"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Tarija", 
    comision: "Comisión de Organización Territorial del Estado y Autonomías", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g2/CESAR MENTASTI PADILLA.png",
    esTitular: true,
    suplente: "Marcela Guerrero Vilca",
    slugSuplente: generarSlug("Marcela Guerrero Vilca"),
    fotoSuplente: "/senadores/suplentes/g2/MARCELA GUERRERO VILCA.png"
  },
  { 
    id: 43, seatNumber: 43, 
    name: "Leonor Rosalva Romero Gutiérrez", 
    slug: generarSlug("Leonor Rosalva Romero Gutiérrez"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Tarija", 
    comision: "Comité de Planificación, Presupuesto, Inversión Pública y Contraloría General del Estado", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g2/LEONOR ROSALVA ROMERO GUTIERREZ.png",
    esTitular: true,
    suplente: "Marco Antonio Segovia Vargas",
    slugSuplente: generarSlug("Marco Antonio Segovia Vargas"),
    fotoSuplente: "/senadores/suplentes/g2/MARCO ANTONIO SEGOVIA VARGAS.png"
  },
  // SUPLENTES
  { 
    id: 44, seatNumber: 44, 
    name: "Luzmaya Zelaya Vega", 
    slug: generarSlug("Luzmaya Zelaya Vega"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Tarija", 
    foto: "/senadores/suplentes/g2/LUZMAYA ZELAYA VEGA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 45, seatNumber: 45, 
    name: "Rolando Vacaflor Gabriel Arana", 
    slug: generarSlug("Rolando Vacaflor Gabriel Arana"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Tarija", 
    foto: "/senadores/suplentes/g2/ROLANDO VACAFLOR GABRIEL ARANA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 46, seatNumber: 46, 
    name: "Marcela Guerrero Vilca", 
    slug: generarSlug("Marcela Guerrero Vilca"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Tarija", 
    foto: "/senadores/suplentes/g2/MARCELA GUERRERO VILCA.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 47, seatNumber: 47, 
    name: "Marco Antonio Segovia Vargas", 
    slug: generarSlug("Marco Antonio Segovia Vargas"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Tarija", 
    foto: "/senadores/suplentes/g2/MARCO ANTONIO SEGOVIA VARGAS.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },

  // ============================================ //
  // ================ SANTA CRUZ ================ //
  // ============================================ //
  // TITULARES
  { 
    id: 48, seatNumber: 48, 
    name: "Paola Limbania López Zeballos", 
    slug: generarSlug("Paola Limbania López Zeballos"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Santa Cruz", 
    comision: "Comité de Seguridad del Estado y Lucha Contra el Narcotráfico", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g3/PAOLA LIMBANIA LOPEZ ZEBALLOS.png",
    esTitular: true,
    suplente: "Richard Espada Ugarte",
    slugSuplente: generarSlug("Richard Espada Ugarte"),
    fotoSuplente: "/senadores/suplentes/g3/RICHARD ESPADA UGARTE.png"
  },
  { 
    id: 49, seatNumber: 49, 
    name: "Branko Goran Marinković Jovicevic", 
    slug: generarSlug("Branko Goran Marinković Jovicevic"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Santa Cruz", 
    comision: "Comisión de Tierra y Territorio / Región Amazónica", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g3/BRANKO GORAN MARINKOVIC JOVICEVIC.png",
    esTitular: true,
    suplente: "Kathia Natalia Miserendino Romero",
    slugSuplente: generarSlug("Kathia Natalia Miserendino Romero"),
    fotoSuplente: "/senadores/suplentes/g3/KATHIA NATALIA MISERENDINO ROMERO.png"
  },
  { 
    id: 50, seatNumber: 50, 
    name: "Kathia Lizbeth Quiroga Fernández", 
    slug: generarSlug("Kathia Lizbeth Quiroga Fernández"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Santa Cruz", 
    comision: "Directiva Legislatura 2025-2026", 
    cargo: "Segunda Vicepresidencia",
    foto: "/senadores/titulares/g3/KATHIA LISBETH QUIROGA FERNÁNDEZ.png",
    esTitular: true,
    suplente: "Leonardo Roca Eguez",
    slugSuplente: generarSlug("Leonardo Roca Eguez"),
    fotoSuplente: "/senadores/suplentes/g3/LEONARDO ROCA EGUEZ.png"
  },
  { 
    id: 51, seatNumber: 51, 
    name: "Rosa Tatiana Áñez Carrasco", 
    slug: generarSlug("Rosa Tatiana Áñez Carrasco"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Santa Cruz", 
    comision: "Directiva Legislatura 2025-2026", 
    cargo: "Tercera Secretaria",
    foto: "/senadores/titulares/g3/ROSA TATIANA AÑEZ CARRASCO.png",
    esTitular: true,
    suplente: "Lorgio Fernando Pareja Saucedo",
    slugSuplente: generarSlug("Lorgio Fernando Pareja Saucedo"),
    fotoSuplente: "/senadores/suplentes/g3/LORGIO FERNANDO PAREJA SAUCEDO.png"
  },
  // SUPLENTES
  { 
    id: 52, seatNumber: 52, 
    name: "Richard Espada Ugarte", 
    slug: generarSlug("Richard Espada Ugarte"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Santa Cruz", 
    foto: "/senadores/suplentes/g3/RICHARD ESPADA UGARTE.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 53, seatNumber: 53, 
    name: "Kathia Natalia Miserendino Romero", 
    slug: generarSlug("Kathia Natalia Miserendino Romero"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Santa Cruz", 
    foto: "/senadores/suplentes/g3/KATHIA NATALIA MISERENDINO ROMERO.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 54, seatNumber: 54, 
    name: "Leonardo Roca Eguez", 
    slug: generarSlug("Leonardo Roca Eguez"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Santa Cruz", 
    foto: "/senadores/suplentes/g3/LEONARDO ROCA EGUEZ.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 55, seatNumber: 55, 
    name: "Lorgio Fernando Pareja Saucedo", 
    slug: generarSlug("Lorgio Fernando Pareja Saucedo"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Santa Cruz", 
    foto: "/senadores/suplentes/g3/LORGIO FERNANDO PAREJA SAUCEDO.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },

  // ============================================ //
  // ================= PANDO ==================== //
  // ============================================ //
  // TITULARES
  { 
    id: 56, seatNumber: 56, 
    name: "Cintia Monica Puerta Campos", 
    slug: generarSlug("Cintia Monica Puerta Campos"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Pando", 
    comision: "Comité de Medio Ambiente, Biodiversidad, Amazonía, Áreas Protegidas y Cambio Climático", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g3/CINTIA MONICA PUERTA CAMPOS.png",
    esTitular: true,
    suplente: "Jesus Humberto Suarez Eguez",
    slugSuplente: generarSlug("Jesus Humberto Suarez Eguez"),
    fotoSuplente: "/senadores/suplentes/g3/JESUS HUMBERTO SUAREZ EGUEZ.png"
  },
  { 
    id: 57, seatNumber: 57, 
    name: "Carol Carlo Durán", 
    slug: generarSlug("Carol Carlo Durán"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Pando", 
    comision: "Comité de Tierra y Territorio, Recursos Naturales y Hoja de la Coca", 
    cargo: "Secretaria de Comite",
    foto: "/senadores/titulares/g3/CAROL CARLO DURAN.png",
    esTitular: true,
    suplente: "Jorge Antonio Quispe Flores",
    slugSuplente: generarSlug("Jorge Antonio Quispe Flores"),
    fotoSuplente: "/senadores/suplentes/g3/JORGE ANTONIO QUISPE FLORES.png"
  },
  { 
    id: 58, seatNumber: 58, 
    name: "Julio Diego Romaña Galindo", 
    slug: generarSlug("Julio Diego Romaña Galindo"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Pando", 
    comision: "Directiva Legislatura 2025-2026", 
    cargo: "Segunda Secretaria",
    foto: "/senadores/titulares/g3/JULIO DIEGO ROMAÑA GALINDO.png",
    esTitular: true,
    suplente: "Carolina Giese Urresti",
    slugSuplente: generarSlug("Carolina Giese Urresti"),
    fotoSuplente: "/senadores/suplentes/g3/CAROLINA GIESE URRESTI.png"
  },
  { 
    id: 59, seatNumber: 59, 
    name: "Eliana Rina Acosta Quispe", 
    slug: generarSlug("Eliana Rina Acosta Quispe"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Pando", 
    comision: "Comisión de Planificación, Política Económica y Finanzas", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g3/ELIANA RINA ACOSTA QUISPE.png",
    esTitular: true,
    suplente: "Sichard Hans Soraide Castedo",
    slugSuplente: generarSlug("Sichard Hans Soraide Castedo"),
    fotoSuplente: "/senadores/suplentes/g3/SICHARD HANS SORAIDE CASTEDO.png"
  },
  // SUPLENTES
  { 
    id: 60, seatNumber: 60, 
    name: "Jesus Humberto Suarez Eguez", 
    slug: generarSlug("Jesus Humberto Suarez Eguez"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Pando", 
    foto: "/senadores/suplentes/g3/JESUS HUMBERTO SUAREZ EGUEZ.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 61, seatNumber: 61, 
    name: "Jorge Antonio Quispe Flores", 
    slug: generarSlug("Jorge Antonio Quispe Flores"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Pando", 
    foto: "/senadores/suplentes/g3/JORGE ANTONIO QUISPE FLORES.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 62, seatNumber: 62, 
    name: "Carolina Giese Urresti", 
    slug: generarSlug("Carolina Giese Urresti"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Pando", 
    foto: "/senadores/suplentes/g3/CAROLINA GIESE URRESTI.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 63, seatNumber: 63, 
    name: "Sichard Hans Soraide Castedo", 
    slug: generarSlug("Sichard Hans Soraide Castedo"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Pando", 
    foto: "/senadores/suplentes/g3/SICHARD HANS SORAIDE CASTEDO.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },

  // ============================================ //
  // ================= BENI ===================== //
  // ============================================ //
  // TITULARES
  { 
    id: 64, seatNumber: 64, 
    name: "Erick Nelson Soruco Alpire", 
    slug: generarSlug("Erick Nelson Soruco Alpire"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Beni", 
    comision: "Comisión de Justicia Plural, Ministerio Público y Defensa del Estado", 
    cargo: "Presidente de Comisión",
    foto: "/senadores/titulares/g3/ERICK NELSON SORUCO ALPIRE.png",
    esTitular: true,
    suplente: "Cesia Roca Escalante",
    slugSuplente: generarSlug("Cesia Roca Escalante"),
    fotoSuplente: "/senadores/suplentes/g3/CESIA ROCA ESCALANTE.png"
  },
  { 
    id: 65, seatNumber: 65, 
    name: "Ernesto Suarez Sattori", 
    slug: generarSlug("Ernesto Suarez Sattori"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Beni", 
    comision: "Comité de Autonomías Departamentales", 
    cargo: "Secretario de Comite",
    foto: "/senadores/titulares/g3/ERNESTO SUAREZ SATTORI.png",
    esTitular: true,
    suplente: "Claudia Cardenas Velasquez",
    slugSuplente: generarSlug("Claudia Cardenas Velasquez"),
    fotoSuplente: "/senadores/suplentes/g3/CLAUDIA CARDENAS VELASQUEZ.png"
  },
  { 
    id: 66, seatNumber: 66, 
    name: "José Roca Haensel", 
    slug: generarSlug("José Roca Haensel"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Beni", 
    comision: "Comité de Autonomías Municipales, Indigena Originario Campesinas y Regionales", 
    cargo: "Secretario de Comite",
    foto: "/senadores/titulares/g3/JOSE ROCA HAENSEL.png",
    esTitular: true,
    suplente: "Mabel Giordano Sonnenschein",
    slugSuplente: generarSlug("Mabel Giordano Sonnenschein"),
    fotoSuplente: "/senadores/suplentes/g3/MABEL GIORDANO SONNENSCHEIN.png"
  },
  { 
    id: 67, seatNumber: 67, 
    name: "Ana Karina Velasco Añez", 
    slug: generarSlug("Ana Karina Velasco Añez"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Beni", 
    comision: "Comité de Fuerzas Armadas y Policía Boliviana", 
    cargo: "Secretaria de comite",
    foto: "/senadores/titulares/g3/ANA KARINA VELASCO ÁÑEZ.png",
    esTitular: true,
    suplente: "Marcelo Matias Cardona Ibañez",
    slugSuplente: generarSlug("Marcelo Matias Cardona Ibañez"),
    fotoSuplente: "/senadores/suplentes/g3/MARCELO MATIAS CARDONA IBAÑEZ.png"
  },
  // SUPLENTES
  { 
    id: 68, seatNumber: 68, 
    name: "Cesia Roca Escalante", 
    slug: generarSlug("Cesia Roca Escalante"),
    party: "Partido Demócrata Cristiano", 
    partyShort: "PDC", 
    partyColor: "#2E7078", 
    department: "Beni", 
    foto: "/senadores/suplentes/g3/CESIA ROCA ESCALANTE.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 69, seatNumber: 69, 
    name: "Claudia Cardenas Velasquez", 
    slug: generarSlug("Claudia Cardenas Velasquez"),
    party: "Libre", 
    partyShort: "LIBRE", 
    partyColor: "#DB3737", 
    department: "Beni", 
    foto: "/senadores/suplentes/g3/CLAUDIA CARDENAS VELASQUEZ.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 70, seatNumber: 70, 
    name: "Mabel Giordano Sonnenschein", 
    slug: generarSlug("Mabel Giordano Sonnenschein"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Beni", 
    foto: "/senadores/suplentes/g3/MABEL GIORDANO SONNENSCHEIN.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  },
  { 
    id: 71, seatNumber: 71, 
    name: "Marcelo Matias Cardona Ibañez", 
    slug: generarSlug("Marcelo Matias Cardona Ibañez"),
    party: "Unidad", 
    partyShort: "ALIANZA", 
    partyColor: "#EFCD04", 
    department: "Beni", 
    foto: "/senadores/suplentes/g3/MARCELO MATIAS CARDONA IBAÑEZ.png",
    esTitular: false,
    suplente: null,
    slugSuplente: null,
    fotoSuplente: null
  }
]

// ============================================ //
// ================ HELPERS =================== //
// ============================================ //
export const getSenadoresPorDepartamento = (departamento) => {
  return senadores.filter(s => s.department === departamento)
}

export const getSenadoresTitulares = (departamento) => {
  return senadores.filter(s => s.department === departamento && s.esTitular === true)
}

export const getSenadoresSuplentes = (departamento) => {
  return senadores.filter(s => s.department === departamento && s.esTitular === false)
}

export const getSenadorBySlug = (slug) => {
  return senadores.find(s => s.slug === slug)
}

export const getAllDepartamentos = () => {
  const depts = [...new Set(senadores.map(s => s.department))]
  return depts.sort()
}