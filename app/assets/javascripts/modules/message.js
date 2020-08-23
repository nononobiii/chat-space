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

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.form__submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.form__submit-btn').prop('disabled', false);
    });
  });

  // let reloadMessages = function() {
  //   let last_message_id = $('.message-list:last').data("message-id") || 0;
  //   $.ajax({
  //     url: "api/messages",
  //     type: 'get',
  //     dataType: 'json',
  //     data: {id: last_message_id}
  //   })
  //   .done(function(message) {
  //     if (message.length !== 0) {
  //       let insertHTML = '';
  //       $.each(messages, function(i ,message) {
  //         insertHTML += buildHTML(message)
  //       });
  //       $('.main-chat__message-list').append(insertHTML);
  //       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
  //     }
  //   })
  //   .fail(function() {
  //     alert('error');
  //   });
  // };
  // setInterval(reloadMessages, 7000);
});