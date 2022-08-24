import "../../publics/css/admin/edit_user.css"
import header_admin from "./header_admin"

const edit_cate_post_page = {
    async render(id) {

        const data_cate_pro_id = await (await fetch(`http://localhost:3001/category_Posts/${id}`)).json()
        console.log(data_cate_pro_id)

        return /*html*/ `
        <div class="ctn_edit_user">
            <div>
                ${header_admin.render()}
            </div>
            <hr>
           <div class="container ctn_article col-md-10 col-12">
                <p>Add category project !   </p>
                <form id="edit_post_form">
                    <p>Name category project:</p>
                    <input type="text" placeholder="Name" value="${data_cate_pro_id.name}" id="name">
                    <button>Save</button>
                </form>    
           </div>
        </div>
        `
    },
    async after_Render(id) {
        const form = document.getElementById("edit_post_form")
        const name = document.getElementById("name")

        const data_cate_pro = await (await fetch(`http://localhost:3001/category_Posts`)).json()

        form.addEventListener("submit", async(e) => {
            e.preventDefault()
            const new_data_cate_pro = {
                name: name.value
            }
            console.log(new_data_cate_pro)

            const name_find = data_cate_pro.find(item => item.name.toLowerCase() === name.value.toLowerCase());
            if (name_find) {
                alert("Tên danh mục đã tồn tại!")
            }

            if (!name_find) {
                const data = await fetch(`http://localhost:3001/category_Posts/${id}`, {
                    method: "PATCH",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(new_data_cate_pro)
                })
            }

        })
    }
}

export default edit_cate_post_page