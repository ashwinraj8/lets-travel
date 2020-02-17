document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = '';
    posts.forEach((post) => { 
        let postHTML =  `
        <div class="col-4">
				<div class="card">
					<img class="card-img-top" src="${post.imageURL}" alt="${post.title}">
					<div class="card-body">
						<h4 class="card-title">${post.title}</h4>
						<p class="card-text">${post.description}</p>
						<a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
					</div>
				</div>
			</div>`;
    articles.insertAdjacentHTML('beforeend',postHTML);
    })
})   