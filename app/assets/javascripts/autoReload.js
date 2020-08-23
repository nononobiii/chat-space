$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-list" data-message-id=${message.id}>
          <div class="message-list__info">
            <div class="message-list__info__name">
              ${message.user_name}
            </div>
            <div class="message-list__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__box">
            <p class="message-list__box__text">
              ${message.content}
            </p>
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = 
      `<div class="message-list" data-message-id=${message.id}>
        <div class="message-list__info">
          <div class="message-list__info__name">
            ${message.user_name}
          </div>
          <div class="message-list__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__box">
          <p class="message-list__box__text">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.message-list:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i,message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});