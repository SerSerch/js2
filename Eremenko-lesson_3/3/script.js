    function setSelectionRange(input, selectionStart, selectionEnd) {
      if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
      } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
      }
    }

    function setCaretToPos(input, pos) {
      setSelectionRange(input, pos, pos);
    }

    window.onload = function() {
      let phoneInput = document.querySelector('#phone');
      phoneInput.addEventListener("click", function() {
        let mask = '+7(___)___-____';
        if (!this.value) {
          this.value = mask;
        }
        setCaretToPos(document.querySelector('#phone'), this.value.search("_"));
      });
      
      phoneInput.addEventListener("focus", function() { this.click(); });
      
      phoneInput.addEventListener("blur", function() {
        let numberPhone = this.value.match(/(\d)/g);
        if (numberPhone && numberPhone.length <= 1) {
          this.value = '';
        }
      });
      
      phoneInput.addEventListener('input', function() {
        let mask = '+7(___)___-____',
            numberPhone = this.value.match(/(\d)/g);
        console.log()
        if (numberPhone && this.value.length != mask.length) {
          let reg1 = /\)/g,
              reg2 = /\-/g;
          numberPhone.splice(0,1);
          
          if (!reg1.test(this.value)) {
            numberPhone.splice(2,1);
          }
          if (!reg2.test(this.value)) {
            numberPhone.splice(5,1);
          }
          while (numberPhone.length < 10) {
            numberPhone.push('_');
          }
          numberPhone.splice(10,numberPhone.length);
          numberPhone.splice(6,0,'-');
          numberPhone.splice(3,0,')');
          numberPhone.splice(0,0,'+7(');
          this.value = numberPhone.join('');
          setCaretToPos(document.querySelector('#phone'), this.value.search("_"));
        }
      });
    };