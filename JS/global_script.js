const theme_content = {
    light:{
        button_text: "&#x2600&#xFE0F Day",
        main_color: "#ffe9f4",
        top_gradient_color: "#fffdfe",
        secondary_color: "#9f2c62",
        header_color: "#153720",
        header_text_color: "#ffffff"
    },

    bright:{
        button_text: "&#127751 Sunset",
        main_color: "#ffc383",
        top_gradient_color: "#fbf4cc",
        secondary_color: "#200232",
        header_color: "#32044D",
        header_text_color: "#FFFFFF"
    },

    dark:{
        button_text: "&#127769 Night",
        main_color: "#030207",
        top_gradient_color: "#0d0b2c",
        secondary_color: "#a30b52",
        header_color: "#0d0b2c",
        header_text_color: "#a30b52"
    },
};

const theme_list = ["light", "bright", "dark"];
var theme_index = 0;

const theme_changer_button = document.getElementById("theme_changer");

let saved_theme_index = localStorage.getItem("theme_index");
if (saved_theme_index != null){
    theme_index = saved_theme_index;
    theme_change_instant(saved_theme_index);
} 

theme_changer_button.addEventListener('click', () => {
    theme_change();
});

function hex_to_rgb(hex){
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return {r: r, g: g, b: b}
}

function rgb_to_hex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function change_color_variable(variable_name, new_color){
    let actual_color = getComputedStyle(document.documentElement).getPropertyValue(variable_name);

    let actual_rgb = hex_to_rgb(actual_color);
    let new_rgb = hex_to_rgb(new_color);
    let t = 0;
    let speed = 0.03;

    function frame(){
        t += speed;
        if (t > 1){
            t = 1;
        }

        const r = Math.round(actual_rgb["r"] + (new_rgb["r"] - actual_rgb["r"]) * t);
        const g = Math.round(actual_rgb["g"] + (new_rgb["g"] - actual_rgb["g"]) * t);
        const b = Math.round(actual_rgb["b"] + (new_rgb["b"] - actual_rgb["b"]) * t);

        document.documentElement.style.setProperty(variable_name, rgb_to_hex(r, g, b));

        if (t < 1){requestAnimationFrame(frame);}
    }
    requestAnimationFrame(frame);
}

function theme_change(index=null){
    if (index == null){
        theme_index += 1;
        if (theme_index > theme_list.length-1){
            theme_index = 0;
        }
    }
    else{
        theme_index = index
    }
    localStorage.setItem('theme_index', theme_index);

    contents = theme_content[theme_list[theme_index]];

    theme_changer_button.innerHTML = contents["button_text"];
    change_color_variable("--main_color", contents["main_color"]);
    change_color_variable("--top_gradient_color", contents["top_gradient_color"]);
    change_color_variable("--secondary_color", contents["secondary_color"]);
    change_color_variable("--header_color", contents["header_color"]);
    change_color_variable("--header_text_color", contents["header_text_color"]);
}

function change_color_variable_instant(variable_name, new_color){
    document.documentElement.style.setProperty(variable_name, new_color);
}

function theme_change_instant(index=null){
    if (index == null){
        theme_index += 1;
        if (theme_index > theme_list.length-1){
            theme_index = 0;
        }
    }
    else{
        theme_index = index
    }
    localStorage.setItem('theme_index', theme_index);

    contents = theme_content[theme_list[theme_index]];

    theme_changer_button.innerHTML = contents["button_text"];
    change_color_variable_instant("--main_color", contents["main_color"]);
    change_color_variable_instant("--top_gradient_color", contents["top_gradient_color"]);
    change_color_variable_instant("--secondary_color", contents["secondary_color"]);
    change_color_variable_instant("--header_color", contents["header_color"]);
    change_color_variable_instant("--header_text_color", contents["header_text_color"]);
}