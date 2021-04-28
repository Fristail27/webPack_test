const testFunc = async () => {
   return await Promise.resolve('test')
}

testFunc().then(res=>console.log(res))

class Util {
    static id = '48484834834'
}

console.log(Util.id)