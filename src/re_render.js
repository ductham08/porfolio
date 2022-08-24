export async function re_Render(elementId, content) {
    if (elementId) {
        document.getElementById(elementId).innerHTML = await content.render();
    }
    if (content.afterRender) await content.afterRender();
}