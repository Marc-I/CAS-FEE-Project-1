'use strict';

var header_html = $("#header-template").html();
var header_template = Handlebars.compile(header_html);
var header_context = {title: "Die Website"};

$('body').append(header_template(header_context));

var entry_html = $('#entry-template').html();
var entry_template = Handlebars.compile(entry_html);
var entries = [
    {title: "Das ist ein Eintrag", content: "Das ist mein Text"},
    {title: "Das ist noch ein Eintrag", content: "Das ist noch ein Text"},
    {title: "Das ist ein weiterer Eintrag", content: "Das ist ein weiterer Text"},
    {title: "Ein Eintrag", content: "Ein Text"},
    {title: "Eintrag", content: "Text"}
    ];

entries.forEach(e => {
    $('body').append(entry_template(e));
});
