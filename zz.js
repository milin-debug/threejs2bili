const data = [{
    id: 1,
    pid: 0,
    name: 'body'
}, {
    id: 2,
    pid: 1,
    name: 'title'
}, {
    id: 3,
    pid: 2,
    name: 'div'
}];

const arr2Tree=(arr,pid=0)=>{
    return arr.reduce((pre,cur)=>{
          if(cur.pid===pid){
            const children=arr2Tree(arr,cur.id)
            children&&children.length&&(cur.children=children)
            pre.push(cur)
          }
          return pre
    },[])
}

console.log(JSON.stringify(arr2Tree(data)));