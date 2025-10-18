const sampleString = 'the quick brown fox jumps over the lazy dog'

const getCounts = (text) => {
  text = text.toLowerCase()

  const words = text.split('')         
  const result = {}
  let total = 0                       

  for (let word of words) {
    if (word !== ' ') {                
      if (word in result) {
        result[word]++
      } else {
        result[word] = 1
      }
      total++
    }
  }

  for (let word in result) {
    result[word] /= total            
  }
  return result
}

console.log(getCounts(sampleString))
