// 自动生成yyyy-mm-dd格式的时间
function CreateTime(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '-' + month + '-' + day
}

// 格林威治时间转北京时间
function FormatT(time: string) {
  // console.log(time)
  let date = new Date(new Date(time).getTime() + 8 * 3600 * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return year + '-' + month + '-' + day
}

export {
  FormatT,
  CreateTime
}