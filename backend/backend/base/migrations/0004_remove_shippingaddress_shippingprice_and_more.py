# Generated by Django 4.0 on 2022-01-01 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingaddress',
            name='shippingPrice',
        ),
        migrations.AddField(
            model_name='order',
            name='paymentMethod',
            field=models.TextField(blank=True, null=True),
        ),
    ]
