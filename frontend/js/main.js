$(document).ready(function() {
  $.ajaxSetup({
      beforeSend: function(xhr, settings){
        function getCookie(name){
          let cookieValue = null;
          if(document.cookie && document.cookie !== ''){
            const cookies = document.cookie.split(';');
            for(let i = 0; i < cookies.length; i += 1){
              const cookie = jQuery.trim(cookies[i]);
              if(cookie.substring(0, name.length + 1) === (`${name}=`)){
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
              }
            }
          }
          return cookieValue;
        }
        if(!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
          xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        }
      },
  });

  $(document).on("click", ".js-toggle-modal", function(e) {
    e.preventDefault();
    $(".js-modal").toggleClass("hidden");
  })
  .on("click", ".js-submit", function(e){
    e.preventDefault();
    const text = $(".js-post-text").val().trim();
    const $btn = $(this);

    if(!text.length) {
      return false;
    }

    $btn.prop("disabled", true).text("Posting!");
    $.ajax({
      type: 'POST',
      url: $(".js-post-text").data("post-url"),
      data: { text: text },
      success: (dataHtml) => {
        $(".js-modal").addClass("hidden");
        $('#posts-container').prepend(dataHtml);
        $btn.prop("disabled", false).text("New Post");
        $(".js-post-text").val('');
      },
      error: (error) => {
        console.warn(error);
        $btn.prop("disabled", false).text("Error");
      }
    });
  })
  .on("click", ".js-follow", function(e){
    e.preventDefault();
    const action = $(this).attr("data-action")
    $.ajax({
      type: 'POST',
      url: $(this).data("url"),
      data: {
        action: action,
        username: $(this).data("username"),
      },
      success: (data) => {
        $(".js-follow-text").text(data.wording)
        if(action == "follow"){
          //Change wording to follow
          $(this).attr("data-action", "unfollow")
        } else {
          //The opposite
          $(this).attr("data-action", "follow")
        }
      },
      error: (error) => {
        console.warn(error);
      }
    });
  })
  // Toggle the edit profile modal
  .on("click", ".js-toggle-edit-modal", function(e) {
    e.preventDefault();
    $(".js-edit-modal").toggleClass("hidden");
  })
  // Handle the edit profile form submission
  .on("submit", ".js-edit-profile-form", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    $.ajax({
      url: "{% url 'profiles:update_profile' %}",
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status === 'success') {
          alert('Profile updated successfully!');
          $(".js-edit-modal").toggleClass("hidden");
          location.reload(); // Reload the page to see the changes
        } else {
          alert('Error updating profile.');
        }
      },
      error: function(error) {
        alert('Error updating profile.');
      }
    });
  });
});
