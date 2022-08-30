function ObjectIsEqual(val:any,val2:any):boolean{
  // 获取对象或数组的键值
  const valKeys = Object.keys(val)
  const valKeys2 = Object.keys(val2)
  // 如果长度不相等就不用进行下一步
  if(valKeys.length != valKeys2.length) return false

  for(const k in val) { 
    if(typeof val[k] !='object' && typeof val2[k] !='object'){
      if(val[k]!=val2[k]) return false
    }else{
      return ObjectIsEqual(val[k],val2[k])
    }
  }
  return true
}

export {
  ObjectIsEqual
}