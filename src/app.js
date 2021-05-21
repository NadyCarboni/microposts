import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// evento para adicionar post

document.querySelector('.post-submit').addEventListener('click', submitPost)
 // evento para deletar
 document.querySelector('#posts').addEventListener('click', deletePost);

// evento para o estado de edição
document.querySelector('#posts').addEventListener('click', enableEdit);
// evento para sair do estado de edicao
document.querySelector('.card-form').addEventListener('click', cancelEdit)
 function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}
// adicionar post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;
  
    const data = {
      title,
      body
    }
  
    // Validate input
    if(title === '' || body === '') {
      ui.showAlert('Por favor preencha todos os campos', 'alert alert-danger');
    } else {
      // Check for ID
      if(id === '') {
        // Create Post
        http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post adicionado', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
      } else {
        // Update Post
        http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post atualizado', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
      }
  
    }
        
   
}
// deletar
function deletePost(e) {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if (confirm('Tem certeza disso?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert('Post removido', 'alert alert-success');
            getPosts();
        })
        .catch (err => console.log(err));
        } 
    }
}

// estado de edição

function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const data = {
            id, title, body
        }
        ui.fillForm(data);
    }
e.preventDefault();
}

// cancelar edicao
function cancelEdit(e) {
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}