from django.urls import path
from base.views import product_views


urlpatterns = [
    path('', product_views.getProducts, name="products"),
    path('<str:pk>/review', product_views.createProductReview, name="products-review"),

    path('<str:pk>/', product_views.getProduct, name="product"),
    path('<str:pk>/delete', product_views.deleteProduct, name="delete-product"),
    path('update/<str:pk>', product_views.updateProduct, name="product-update"),
    path('create', product_views.createProduct, name="product-create"),
    path('upload', product_views.uploadImage, name="product-upload-image"),
    path('topRated', product_views.getTopProducts, name="product-top-rated"),




]
