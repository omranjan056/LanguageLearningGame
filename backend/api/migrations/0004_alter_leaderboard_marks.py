# Generated by Django 5.0 on 2023-12-22 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_leaderboard_marks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaderboard',
            name='marks',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
    ]