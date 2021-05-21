class UI {
    constructor() {
      this.post = document.querySelector('#posts');
      this.titleInput = document.querySelector('#title');
      this.bodyInput = document.querySelector('#body');
      this.idInput = document.querySelector('#id');
      this.postSubmit = document.querySelector('.post-submit');
      this.forState = 'add';
    }
  
    showPosts(posts) {
      let output = '';
  
      posts.forEach((post) => {
        output += `
          <div class="card mb-3">
            <div class="card-body">
              <h4 class="card-title">${post.title}</h4>
              <p class="card-text">${post.body}</p>
              <a href="#" class="edit card-link" data-id="${post.id}">
                <i class="fa fa-pencil"></i>
              </a>
  
              <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
            </div>
          </div>
        `;
      });
  
      this.post.innerHTML = output;
    }
  
    showAlert(message, className) {
      this.clearAlert();
  
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = className;
      // Add text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.postsContainer');
      // Get posts
      const posts = document.querySelector('#posts');
      // Insert alert div
      container.insertBefore(div, posts);
  
      // Timeout
      setTimeout(() => {
        this.clearAlert();
      }, 3000);
    }
  
    clearAlert() {
      const currentAlert = document.querySelector('.alert');
  
      if(currentAlert) {
        currentAlert.remove();
      }
    }
  
    clearFields() {
      this.titleInput.value = '';
      this.bodyInput.value = '';
    }
    // fill form to edit
    fillForm(data) {
      this.titleInput.value = data.title;
      this.bodyInput.value = data.body;
      this.idInput.value = data.id;
      this.changeFormState('edit');
    }
    // limpar id escondido
    clearIDInput() {
      this.idInput.value = '';
    }


    // mudar para formato de edicao
   changeFormState(type) {
     if(type === 'edit') {
        this.postSubmit.textContent = 'Atualizar texto';
        this.postSubmit.className = 'post-submit btn btn-warning btn-block'
        // criar botao de cancelar
        const button = document.createElement('button');
        button.className = "post-cancel btn btn-light btn-block"
        button.appendChild(document.createTextNode('Cancelar edição'));
        // pegar o pai
        const cardForm = document.querySelector('.card-form');
        // pegar o elemento para inserir antes
        const formEnd = document.querySelector('.form-end');
        // inserir botao
        cardForm.insertBefore(button, formEnd);
     }else {
      this.postSubmit.textContent = 'Enviar';
        this.postSubmit.className = 'post-submit btn btn-primary  btn-block'
     // remover o botao de cancelar se ele estiver la
     if (document.querySelector('.post-cancel')) {
       document.querySelector('.post-cancel').remove();  
     }
     // Clear ID from hidden field
     this.clearIDInput();
     // limpar o texto
     this.clearFields();
      }
   }


}
  
  export const ui = new UI();