const form = $('#upload-form');

$(form).submit(function (e) {
  e.preventDefault();
  const target = e.target;
  let fileInput = $(target).find('#file')[0].files[0];
  let status = $('#status-msg');
  console.log(fileInput)
  if (fileInput) {
    let data = new FormData();
    data.append('file', fileInput);
    $.ajax({
      url: '/',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      method: 'POST',
      type: 'POST', // For jQuery < 1.9
      success: function (data) {
        if(data){
          $(status).html('File Uploaded - Copy this link: <a href="/files/' + data + '">' + location.hostname + ':3000' + '/files/' + data +'</a>');
          $(status).css('color', 'green');
        } else{
          $(status).html('Upload Failed');
          $(status).css('color', 'red');
        }
      }
    });
  } else {
    $(status).html('Select a file');
    $(status).css('color', 'red');
  }
});