function disableFontFinder() {
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('click', mouseClick);

  if (item) {
    if (item.parentElement) {
      item.parentElement.removeChild(item);
    }
    item = null;
  }

  itemList.forEach((item) => {
    if (item.parentElement) {
      item.parentElement.removeChild(item);
    }
  });
  itemList = [];

  if (stopBtn) {
    stopBtn.parentElement.removeChild(stopBtn);
    stopBtn = null;
  }
}

disableFontFinder();
