const theme_content = {
    bright:{
        button_text: "&#9728 Bright",
        main_color: "#FFECB3",
        top_gradient_color: "#FFFFEB",
        secondary_color: "#32044D"
    },

    dark:{
        button_text: "&#127769 Dark",
        main_color: "#000000",
        top_gradient_color: "#A7A7A7",
        secondary_color: "#2b8ac5"
    }
};

const theme_list = ["bright", "dark"];
var theme_index = 0;

const theme_changer_button = document.getElementById("theme_changer");

theme_changer_button.addEventListener('click', theme_change);

function change_root_variable(variable_name, new_value){
    document.documentElement.style.setProperty(variable_name, new_value);
}

function theme_change(){
    theme_index += 1;
    if (theme_index > theme_list.length-1){
        theme_index = 0;
    }

    contents = theme_content[theme_list[theme_index]];

    theme_changer_button.innerHTML = contents["button_text"];
    change_root_variable("--main_color", contents["main_color"]);
    change_root_variable("--top_gradient_color", contents["top_gradient_color"]);
    change_root_variable("--secondary_color", contents["secondary_color"]);
}