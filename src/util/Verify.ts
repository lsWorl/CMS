function PhoneVerify(phone:string):boolean{
  const pattern = /0?(13|14|15|18|17)[0-9]{9}/
  return pattern.test(phone)
}

function DateVerify(date:string):boolean{
  const pattern = /^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/

  return pattern.test(date)
}


export {
  PhoneVerify,
  DateVerify
}