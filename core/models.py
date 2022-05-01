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
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = _("file")
        verbose_name_plural = _("files")

    def __str__(self):
        return str(f"document{self.pk}")





class Access(models.Model):

    accessBy = models.ForeignKey(User, verbose_name=_("Access given by"), on_delete=models.CASCADE,  related_name="given by +")
    accessTo = models.ForeignKey(User, verbose_name=_("Access given to"), on_delete=models.CASCADE, related_name="given to +")
    document = models.ForeignKey(File, verbose_name=_("Document"), on_delete=models.CASCADE)
    date = models.DateField(_("Timestamp"), auto_now=True)


    class Meta:
        verbose_name = _("access")
        verbose_name_plural = _("access")

    def __str__(self):
        return str(f"{self.accessBy} - {self.accessTo}")

