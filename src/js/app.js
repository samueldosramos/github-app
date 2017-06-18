const URL = 'https://api.github.com/users/'
const buttonSearch = document.querySelector('[data-js="button"]')
const inputSearch = document.querySelector('[data-js="input"]')
const responseSection = document.querySelector('[data-js="response"]')

buttonSearch.addEventListener('click', function() {
  fetch(`${URL}${inputSearch.value}`).then(response => response.json())
  .then(result => {
    responseSection.innerHTML = templateResponse(result.avatar_url, result.name, result.public_repos, result.created_at, result.html_url)
  }).catch(err => {
    console.error('Falhou em buscar a requisição', err)
  })
})

function templateResponse(avatar, name, repository, created, url) {
  return `<img class="response-image" src="${avatar}" alt="${name}">
    <div class="response-content">
      <label class="response-label"><span class="response-span">Nome: </span>${name}</label>
      <label class="response-label"><span class="response-span">Repositórios: </span>${repository}</label>
      <label class="response-label"><span class="response-span">Desde: </span>${created}</label>
      <a class="response-url" href="${url}">Ir no perfil</a>
    </div>`
}
