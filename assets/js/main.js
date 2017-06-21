'use strict';

var URL = 'https://api.github.com/users/';
var buttonSearch = document.querySelector('[data-js="button"]');
var inputSearch = document.querySelector('[data-js="input"]');
var responseSection = document.querySelector('[data-js="response"]');

buttonSearch.addEventListener('click', function () {
  fetch('' + URL + inputSearch.value).then(function (response) {
    return response.json();
  }).then(function (result) {
    responseSection.innerHTML = templateResponse(result.avatar_url, result.name, result.public_repos, result.created_at, result.html_url);
  }).catch(function (err) {
    console.error('Falhou em buscar a requisição', err);
  });
});

function templateResponse(avatar, name, repository, created, url) {
  return '<img class="response-image" src="' + avatar + '" alt="' + name + '">\n    <div class="response-content">\n      <label class="response-label"><span class="response-span">Nome: </span>' + name + '</label>\n      <label class="response-label"><span class="response-span">Reposit\xF3rios: </span>' + repository + '</label>\n      <label class="response-label"><span class="response-span">Desde: </span>' + created + '</label>\n      <button class="response-url" href="' + url + '">Ir no perfil</button>\n    </div>';
}