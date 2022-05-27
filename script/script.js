const btn = document.querySelector(".btn")
const inputValue = document.getElementById('username');
const first_div = document.getElementById('first')
const second_div = document.getElementById('second')
const gallery = document.getElementById('gallery')

function makeSearch() {
  let page = localStorage.getItem('page')
  const values = inputValue.value.split(' ');
  if(values.length = 2) {
    first_div.innerHTML = values[0];
    second_div.innerHTML = values[1];
  } else {
    alert("please fill the form correctly")
  }
  const url = `https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=7d639049ecb31ade9faea3e095d2ae0d&tags=${inputValue.value.split(' ').join('-')}&tag_mode=all&nojsoncallback=1&per_page=10&page=${page ?? 1}}`
  if(values.length = 2) {

    axios.get(url).then((data) => {
      let images = data.data.photos.photo
      gallery.innerHTML = ''
      images.forEach(elem => {
        let img = document.createElement('img')
        img.classList.add('gallery-item')
        img.setAttribute('src',`https://farm${elem.farm}.staticflickr.com/${elem.server}/${elem.id}_${elem.secret}.jpg`)
        gallery.appendChild(img)
      })
      let nextPage = page ? parseInt(page)+1 : 1
      localStorage.setItem('page', nextPage)
    }).catch(err => {
      console.log(err)
    })
  } else {
    alert("please fill the form correctly")
  }
}

