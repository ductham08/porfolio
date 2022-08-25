import "../../publics/css/admin/list_post.css"
import { re_load } from "../../ultil/re_load"
import header_admin from "./header_admin"

const list_project_page = {
        async render() {
            const data = await (await fetch("https://porfolio-theta-nine.vercel.app/projects?_expand=category_Project")).json()
            return /*html*/ `
        <div class="ctn_list_post">
            <div>
                ${header_admin.render()}
            </div>
            <div class="ctn_article">
                <table>
                    <tr>
                        <th class="col-md-1 col-1">Id</th>
                        <th class="col-md-2 col-2">Thumbnail</th>
                        <th class="col-md-2 col-3">Name project</th>
                        <th class="col-md-4 col-5">Content</th>
                        <th class="col-md-1 col-2">Createat</th>
                        <th class="col-md-2 col-2">
                            <button><a href="/admin/project/add">Add</a></button>
                        </th>
                    </tr>
                    ${data.map((item) => {
                        return /*html*/ `
                        <tr>
                            <td>${item.id}</td>
                            <td><img width="100%"  id="thum_review" src="${item.thumbnail}" alt=""></td>
                            <td>${item.name}</td>
                            <td class="content">${item.content}</td>
                            <td>${item.createat}</td>
                            <td>
                                <button value="${item.id}" id="btn_remove_project">Remove</button>
                                <button><a href="/admin/project/edit/${item.id}">Edit</a></button>
                            </td>
                        </tr>
                        `
                    }).join("")}
                </table>
            </div>
        </div>
        `
    }, after_Render(){
        const btn_remove = document.querySelectorAll("#btn_remove_project")
        for (const btn of btn_remove) {
            const id_btn  = btn.value
            btn.addEventListener("click", async ()=>{
                // Call api
                const confirm = window.confirm(`Ban co muon xoa project so ${id_btn}`)
                if(confirm){
                    const data = await fetch(`https://porfolio-theta-nine.vercel.app/projects/${id_btn}`,{
                        method:"DELETE"
                    })
                    if(data){
                        re_load("app",list_project_page)
                        console.log("xoa thanh cong")
                   }
                }
            })
        }
    }
}

export default list_project_page