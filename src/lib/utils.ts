/**
 * Get the full date value for the shortened date specified and also take
 * into account the 19xx/20xx centennial into account when calculating the
 * correct year value to return.
 */
export const getFullDateFromMRZ = (str: string) => {
  let d = new Date();
  d.setFullYear(d.getFullYear() + 15);
  let centennial = (""+d.getFullYear()).substring(2, 4);

  let year;
  if (str.substring(0, 2) > centennial) {
    year = '19' + str.substring(0, 2);
  } else {
    year = '20' + str.substring(0, 2);
  }

  return {
    year: year,
    month: str.substring(2, 4),
    day: str.substring(4, 6),
    original: str,
    format: `${str.substring(4, 6)}/${str.substring(2, 4)}/${year}`
  };
};

export const getFullDateFromMRZMySQL = (str: string) => {
  let d = new Date();
  d.setFullYear(d.getFullYear() + 15);
  let centennial = (""+d.getFullYear()).substring(2, 4);

  let year;
  if (str.substring(0, 2) > centennial) {
    year = '19' + str.substring(0, 2);
  } else {
    year = '20' + str.substring(0, 2);
  }

  return {
    year: year,
    month: str.substring(2, 4),
    day: str.substring(4, 6),
    original: str,
    format: `${year}-${str.substring(2, 4)}-${str.substring(4, 6)}`
  };
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getCode(length: number) {
  let code = [];
  for(let i = 0; i < length; i++){
    code.push(getRandomInt(0, 9));
  }

  return code.join("");
}

export function getDifference(a: any, b: any) {
  return a.filter((element: any) => {
    return !b.includes(element);
  });
}


export function obfuscateEmail(email: string, userPercentage: number, domainPercentage: number) {
  const [user, domain] = email.split("@");
  // Ofuscar usuario
  const visibleUserCount = Math.ceil(user.length * 0.3);
  const obfuscatedUser = user.slice(0, visibleUserCount) + "*".repeat(user.length - visibleUserCount);
  
  // Ofuscar dominio
  const [domainName, domainExtension] = domain.split(".");
  const visibleDomainCount = Math.ceil(domainName.length * 0.3);
  const obfuscatedDomain = domainName.slice(0, visibleDomainCount) + "*".repeat(domainName.length - visibleDomainCount);
  
  return `${obfuscatedUser}@${obfuscatedDomain}.${domainExtension}`;
}


export function diferenciaMeses(fecha1: Date, fecha2: Date): number {
  const ano1 = fecha1.getFullYear();
  const mes1 = fecha1.getMonth();
  const ano2 = fecha2.getFullYear();
  const mes2 = fecha2.getMonth();

  const meses = (ano2 - ano1) * 12 + (mes2 - mes1);
  return meses;
}
