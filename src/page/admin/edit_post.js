import "../../publics/css/admin/edit_user.css"
import header_admin from "./header_admin"


const edit_post = {
        async render(id) {
            const data_post = await (await fetch(`https://porfolio-theta-nine.vercel.app/posts/${id}`)).json()
            const data_category_post = await (await fetch("https://porfolio-theta-nine.vercel.app/category_Posts")).json()
            console.log(data_post)
            return /*html*/ `
        <div class="ctn_edit_user">
            <div>
                ${header_admin.render()}
            </div>
            <hr>
            <div class="container ctn_article col-md-10 col-12">
                <p>Edit post ${data_post.title}!</p>
                <form id="edit_post_form">
                    <p>Title:</p>
                    <input type="text" value="${data_post.title}" placeholder="Title" id="title">
                    <p>Category post:</p>
                    <select id="category_post_id">
                        ${data_category_post.map((item) => {
                            return /*html*/ `
                                <option value="${item.id}">${item.name}</option>
                            `
                        }).join("")}
                    </select>
                    <p>Createat:</p>
                    <input type="date" value="${data_post.createat}" placeholder="Createat" id="createat">
                    <p>Thumbnail:</p>
                    <input type="file" src="${data_post.image}" placeholder="" class="img_file" id="thumbnail">
                    <p>Content:</p>
                    <textarea id="content"  rows="10" placeholder="Description">${data_post.content}</textarea>
                    <button>Save</button>
                </form>    
           </div>
        </div>
        `
    },
    after_Render(id) {
        const form = document.getElementById("edit_post_form")
        const title = document.getElementById("title")
        const category = document.getElementById("category_post_id")
        const createat = document.getElementById("createat")
        const thumbnail = document.getElementById("thumbnail")
        const content = document.getElementById("content")


        form.addEventListener("submit", async(e) => {
            e.preventDefault()

            async function url() {
                if (image.files[0]) {
                    const response = await uploadFile(image.files[0]);
                    return response.data.url
                } else {
                    return avatar
                }
            }
            const new_data_user = {
                title: title.value,
                category_PostId: category.value,
                createat: createat.value,
                content: content.value,
            }
            console.log(new_data_user)
            const data = await fetch(`https://porfolio-theta-nine.vercel.app/posts/${id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new_data_user)
            })

            if (data) {
                alert("Successful change!")
            }
        })
    }
}

export default edit_post