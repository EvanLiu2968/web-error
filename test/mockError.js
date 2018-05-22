/*!
 *  error test case
 */

// request error
asyncExec(function(){
  new Image().src = 'https://test.evanliu2968.com.cn'
})

// ReferenceError
asyncExec(function(){
  test()
})

// TypeError
asyncExec(function(){
  window.dog()
})

function asyncExec(cb){
  setTimeout(cb, 0)
}