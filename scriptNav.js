
const accHeaders = document.querySelectorAll('.accordion-header'); //querySelectorAll(selector): método que toma un selector CSS como argumento.

accHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const item = this.parentNode;

        document.querySelectorAll('.accordion-item').forEach(el => {
            if (el !== item) {
                el.classList.remove('active');
            }
        });

        item.classList.toggle('active');
    });
});