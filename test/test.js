describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // 箭头函数改变上下文
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global1', function () {
    function test() {
      // this 指向全局
      should.equal(this, global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？ 
            should.equal(this, global)
          }
          return _say.bind(obj)
          // 此时obj是undfined, 而bind函数如果传递undefined/null相当于不传，此时this指向全局对象global
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // 此时obj是{}, 而bind函数把_say里的this绑定给obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})