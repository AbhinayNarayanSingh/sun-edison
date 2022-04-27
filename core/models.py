from django.db import models
from django.urls import reverse, reverse_lazy
from django.utils.translation import gettext, gettext_lazy as _
from django.utils.text import slugify
from user.models import User

def document_dir_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'document/user_{0}/{1}'.format(instance.user, filename)


class File(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField( blank=True, null=True)
    document = models.FileField(upload_to=document_dir_path, blank=True, null=True)
    access = models.ManyToManyField(User, verbose_name=_("Who has access"), related_name="access" , blank=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)
    modifier = models.CharField(_("Modified by"), max_length=250,  blank=True, null=True)

    class Meta:
        verbose_name = _("file")
        verbose_name_plural = _("files")

    def __str__(self):
        return str(f"document{self.pk}")

    def get_absolute_url(self):
        return reverse("file_detail", kwargs={"pk": self.pk})
