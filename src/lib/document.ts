export async function getCodLicenciaMedia(content: string[]) {
  let idx = content.findIndex((item: any) => item === 'Código de Verificación');
  if ( idx !== -1 ) {
    idx = content.findIndex((item: any) => item === 'Nº');
    if ( idx !== -1 ) {
      let tmpA = [];
      for (let y = idx + 1; y < content.length; y++ ) {
        if ( content[y] === '' ) break;
        tmpA.push(content[y]);
      }

      const codigo = tmpA.length > 0 ? tmpA.filter((item: any) => item.trim().length > 0).join(' ') : '';
      return codigo;
    }
  }
  return null;
}

export async function validateFolioCodigoVerificacion(content: string[]) {
  let folio = null;
  let codigo_verificacion = null;
  //Buscar folio.
  let tmpA = [];
  let idx = content.findIndex((item: any) => item === 'FOLIO :');
  if ( idx !== -1 ) {
    for (let y = idx + 1; y < content.length; y++ ) {
      if ( content[y] === 'Código Verificación:' ) break;
      tmpA.push(content[y]);
    }
    folio = tmpA.length > 0 ? tmpA.filter((item: any) => item.trim().length > 0).join(' ') : '';
    //Buscar codigo de verificacion.
    tmpA = [];
    idx = content.findIndex((item: any) => item === 'Código Verificación:');
    if ( idx !== -1 ) {
      for (let y = idx + 1; y < content.length; y++ ) {
        if ( content[y] === folio ) break;
        tmpA.push(content[y]);
      }
      codigo_verificacion = tmpA.length > 0 ? tmpA.filter((item: any) => item.trim().length > 0).join(' ') : '';
    }
  }

  console.log({folio, codigo_verificacion});
  if ( folio !== null && codigo_verificacion !== null ){
    const formData = new FormData();
    formData.append("ver_nameInputTextFolio", folio);
    formData.append("ver_nameInputTextCodVerificador", codigo_verificacion);

    const response = await fetch("https://www.registrocivil.cl/OficinaInternet/verificacion/OficinaInternet/verificacion/verificarCertificado.srcei", 
    {
      method: "POST",
      body: formData,
    });
    //console.log(response);
    return await response.json();
  }
  
  return null;
}

export async function getCopiaPdf(urlCopia: string) {

  const url = `https://www.registrocivil.cl/OficinaInternet/verificacion/${urlCopia}`;
  console.log(url);
  const response = await fetch(url);

  return await response.blob();
}

export async function getDataCertNacimientoAsignacionFamiliar(content: string[]) {
  
  let idx0 = content.findIndex((item: any) => item === 'CERTIFICADO DE NACIMIENTO');

  if ( idx0 !== -1 ) {

    let idx1 = content.findIndex((item: any) => item === 'Uso exclusivo para ASIGNACION FAMILIAR');
    //console.log({idx0, idx1});

    if ( idx1 !== -1 ) {

      let jsonCert : {[key: string]: any} = {};

      let keysSearch: any[] = [];

      let tmpKeys = [
        'Circunscripción',
        'Nro. inscripción',
        'Registro',
        'Año',
        'Nombre inscrito',
        'R.U.N.',
        'Fecha nacimiento',
        'Hora nacimiento',
        'Sexo',
        'Lugar de',
        'Nombre del',
        'R.U.N. del',
        'Nombre de',
        'R.U.N. de',
        //''
      ]

      for (let x = 0; x < tmpKeys.length; x++ ) {
        if ( content.findIndex((item: any) => item === tmpKeys[x]) !== -1) {
          keysSearch.push(tmpKeys[x]);
        }
      }

      keysSearch.push('');

      //console.log(keysSearch);

      for (let x = 0; x < keysSearch.length - 1; x++ ) {
        const inicio = keysSearch[x];
        const fin = keysSearch[x+1];

        //console.log({inicio, fin});

        let idx = content.findIndex((item: any) => item === inicio);
        let varName = '';
        let tmpA = []
        for (let y = idx; y < content.length; y++ ) {
          if ( content[y] === fin ) break;

          if ( content[y] === ':') {
            varName = tmpA.join('').trim();
            tmpA = [];
          } else {
            //if ( content[y].trim().length > 0 ) 
            {
              tmpA.push(content[y]);
            }
          }
        }

        let varVal = tmpA.length > 0 ? tmpA.filter((item: any) => item.trim().length > 0).join(' ') : '';
        //console.log(varName, varVal);

        jsonCert[varName] = varVal;
      }

      return jsonCert;

    } else {
      return { error: 2 }; //no es Uso exclusivo para ASIGNACION FAMILIAR
    }
  } else {
    return { error: 1 }; //no es un certificado
  }
}