$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-list">
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
      `<div class="message-list">
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
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});