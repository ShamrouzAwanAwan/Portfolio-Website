const all_carasouls = document.querySelectorAll('.flate-carasoul')
const all_carasouls_btn = document.querySelectorAll('.flate-carasoul > button')

function add_carasoul(carasoul_class_name, dest_cls_name, isRound) {
    const carasoual = document.createElement('div');
    carasoual.classList.add('flate-carasoul');
    if (isRound === true) {
        carasoual.classList.add('round50');
    }
    carasoual.classList.add(carasoul_class_name);
    carasoual.innerHTML = `<button class="next-button" style="display: block;" onclick=scroll_carasoul('${carasoul_class_name}','next')>&#8594</button><button class="prev-button" style="opacity: 0;" onclick=scroll_carasoul('${carasoul_class_name}','prev')>&#8592</button><div class="content"></div>`;
    document.querySelector(dest_cls_name).appendChild(carasoual);
}
function place_tile(carasoul_class_name, tile_image, tile_title, tile_subTitle, tile_comment, tile_ratings) {
    let rating;
    const carasoul = document.querySelector('.' + carasoul_class_name + ' > .content');
    switch(tile_ratings){
        case 1:
            rating = 'rt1'
            break;
        case 2:
            rating = 'rt2'
            break;
        case 3:
            rating = 'rt3'
            break;
        case 4:
            rating = 'rt4'
            break;
        case 5:
            rating = 'rt5'
            break;
    }
    const personHTML = `<div class="start"> <img src="` + tile_image + `" alt="Testimonial"> </div> <div class="end"> <div> <h2>` + tile_title + `</h2> <p>` + tile_subTitle + `</p> </div> <div class="c_rt_bar ` + rating + `"></div> <span>` + tile_comment + `</span> </div> </div>`;
    const major_tile = document.createElement('div');
    major_tile.classList.add('major_tile');
    major_tile.innerHTML = personHTML;
    carasoul.appendChild(major_tile);
}
function scroll_carasoul(carasoul_class_name,direction){
    const carasoul_content = document.querySelector('.' + carasoul_class_name + "> .content");
    if(direction === 'next'){
        carasoul_content.scrollLeft += 360;
        document.querySelector('.'+carasoul_class_name+'> button.prev-button').style = `opacity: 1;`
    }
    else{
        carasoul_content.scrollLeft -= 360;
    }
}
