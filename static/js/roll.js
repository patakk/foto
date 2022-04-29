function goBack() {
    userName = window.location.search.split("&")[0].split("=")[1];
    window.location.href = '/foto/preview?userName=' + userName;
}