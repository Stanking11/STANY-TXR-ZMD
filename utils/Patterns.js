module.exports = {
  // Main URL detection pattern
  URL_REGEX: /(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[\w-]+\.)+[\w]{2,}(?:\/[^\s]*)?/gi,
  
  // Common URL shorteners
  SHORTENER_REGEX: /(?:bit\.ly|goo\.gl|shorte\.st|t\.co|tinyurl|ow\.ly|buff\.ly|adf\.ly|shrink\.me|v\.gd|is\.gd|soo\.gd|s2r\.co|click\.ru|bc\.vc|zzb\.bz|ouo\.io|cutt\.ly|u\.bb|festyy\.com|hyperurl\.co|shorturl\.at)/gi,
  
  // Obfuscated URL patterns
  OBFUSCATED_REGEX: /(?:h+[x*]{2,}p+s?:\/\/|h+[x*]{2,}p+[s*]?%3a%2f%2f|\[\.\]|\(\.\)|{\.[^}]*})/gi,
  
  // Common URL variations with special characters
  SPECIAL_CHAR_REGEX: /(?:[\w-]+\.)+(?:com|net|org|xyz|tk|ml|ga|cf|gq)(?:[\?\/#][^\s]*)?/gi,
  
  // Email-like URL patterns
  EMAIL_STYLE_REGEX: /(?:[\w.-]+@)?(?:[\w-]+\.)+[\w]{2,}(?:\/[^\s]*)?/gi,
  
  // Unicode domain detection
  UNICODE_REGEX: /(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.[^\s]{2,}/gi,
  
  // Combined anti-link pattern
  ANTI_LINK_REGEX: function() {
    return new RegExp(
      '(' +
      this.URL_REGEX.source + '|' +
      this.SHORTENER_REGEX.source + '|' +
      this.OBFUSCATED_REGEX.source + '|' +
      this.SPECIAL_CHAR_REGEX.source + '|' +
      this.EMAIL_STYLE_REGEX.source + '|' +
      this.UNICODE_REGEX.source +
      ')', 'gi'
    );
  },
  
  // Utility function to check allowed domains
  containsAllowedDomain: function(text, allowedDomains) {
    const combinedRegex = new RegExp(
      allowedDomains.map(domain => {
        const escaped = domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return `(?:https?://)?(?:www\\.)?${escaped}(/|\\b)`;
      }).join('|'),
      'gi'
    );
    return combinedRegex.test(text);
  }
};
