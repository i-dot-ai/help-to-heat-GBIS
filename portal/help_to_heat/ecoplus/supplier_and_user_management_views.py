from django.shortcuts import redirect, render

from help_to_heat.ecoplus import models


def add_supplier_view(request):
    if request.method == "GET":
        return render(request, "supplier-admin/add-supplier.html", {})
    else:
        supplier_name = request.POST.get("supplier_name")
        new_supplier = models.Supplier(name=supplier_name, is_disabled=False)
        new_supplier.save()
        return redirect("homepage")


def edit_supplier_view(request, supplier_id):
    if request.method == "GET":
        supplier = models.Supplier.objects.get(pk=supplier_id)
        return render(request, "supplier-admin/edit-supplier.html", {"supplier": supplier.name})
    else:
        supplier = models.Supplier.objects.get(pk=supplier_id)
        supplier.name = request.POST.get("supplier_name")
        supplier.save()
        return redirect("homepage")


def change_supplier_disabled_status_view(request, supplier_id):
    if request.method == "GET":
        supplier = models.Supplier.objects.get(pk=supplier_id)
        supplier.is_disabled = not supplier.is_disabled
        supplier.save()
        return redirect("homepage")


def supplier_team_leads_view(request, supplier_id):
    if request.method == "GET":
        supplier = models.Supplier.objects.get(pk=supplier_id)
        users = supplier.user_set.all()
        return render(request, "supplier-admin/supplier-team-lead-list.html", {"users": users, "supplier": supplier})


def supplier_team_leads_add_view(request, supplier_id):
    if request.method == "GET":
        supplier = models.Supplier.objects.get(pk=supplier_id)
        return render(request, "supplier-admin/add-supplier-team-lead.html", {"supplier": supplier})
    else:
        supplier = models.Supplier.objects.get(pk=supplier_id)
        leader_name = request.POST.get("team-leader-name")
        leader_email = request.POST.get("team-leader-email")

        user, _ = models.User.objects.get_or_create(email=leader_email)
        user.full_name = leader_name
        user.is_team_leader = True
        user.supplier = supplier
        user.save()
        return redirect("supplier-team-leads", supplier.id)


def supplier_team_leads_edit_view(request, supplier_id, user_id):
    if request.method == "GET":
        user = models.User.objects.get(pk=user_id)
        supplier = models.Supplier.objects.get(pk=supplier_id)
        return render(request, "supplier-admin/edit-supplier-team-lead.html", {"supplier": supplier, "user": user})
    else:
        user = models.User.objects.get(pk=user_id)
        supplier = models.Supplier.objects.get(pk=supplier_id)
        leader_name = request.POST.get("team-leader-name")
        leader_email = request.POST.get("team-leader-email")

        user.full_name = leader_name
        user.email = leader_email
        user.save()
        return redirect("supplier-team-leads", supplier.id)


def supplier_team_leads_remove_view(request, supplier_id, user_id):
    if request.method == "GET":
        supplier = models.Supplier.objects.get(pk=supplier_id)
        user = models.User.objects.get(pk=user_id)
        user.supplier = None
        user.save()
        return redirect("supplier-team-leads", supplier.id)
