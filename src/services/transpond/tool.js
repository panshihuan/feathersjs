module.exports = class tool {

  show() {
    return Promise.resolve({xx: 23466})
  }

  //工程量转化
  quantities(E_Z_HI, E_Z_LOW, E_HI, E_LOW, Value) {

    let e_z_hi = parseFloat(E_Z_HI);
    let e_z_low = parseFloat(E_Z_LOW);
    let e_hi = parseFloat(E_HI);
    let e_low = parseFloat(E_LOW);
    let value = parseFloat(Value);


    let tagValue = (e_z_hi - e_z_low) * (value - e_low) / (e_hi - e_low) + e_z_low;
    // console.log("工程量:++++++++++++++++++++++++++++++++++++++"+tagValue);
    return tagValue;
  }

}

