<script>
  const mapToken = "<%= process.env.MAP_TOKEN %>";
  const coordinates = <%- JSON.stringify(listing.geometry.coordinates) %>;
</script>