var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        //it goes by odd numbers in the DOM
        //inner Text would mean getting the text that is inside the li
        //how to bind an event listener to an element
        const firstName = this.parentNode.parentNode.childNodes[1].innerText
        const lastName = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('attendance', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'firstName': firstName,
            'lastName': lastName,
            'thumbUp':thumbUp,

          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        //it goes by odd numbers in the DOM
        //inner Text would mean getting the text that is inside the li
        //how to bind an event listener to an element
        const firstName = this.parentNode.parentNode.childNodes[1].innerText
        const lastName = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)

        fetch('attendanceTo', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'firstName': firstName,
            'lastName': lastName,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
            window.location.reload(true)
        })
      });
});
//appending a event listener to every single trash can
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const firstName = this.parentNode.parentNode.childNodes[1].innerText
        const lastName = this.parentNode.parentNode.childNodes[3].innerText
        fetch('attendance', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'firstName': firstName,
            'lastName': lastName
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
