// 格林威治时间转北京时间
function FormatT(time:string){
  // console.log(time)
  let date = new Date(new Date(time).getTime() + 8 * 3600 * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return year + '-' + month + '-' + day
}

export {
  FormatT
}