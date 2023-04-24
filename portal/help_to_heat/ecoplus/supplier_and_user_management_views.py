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
        return render(request, "supplier-admin/disable-supplier-confirmation.html", {"supplier": supplier})
    else:
        supplier = models.Supplier.objects.get(pk=supplier_id)
        supplier.is_disabled = not supplier.is_disabled
        supplier.save()
        return redirect("homepage")


def supplier_team_leads_view(request, supplier_id):
    if request.method == "GET":
        supplier = models.Supplier.objects.get(pk=supplier_id)
        users = supplier.user_set.filter(is_team_leader=True).all()
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

        user.full_name = leader_name
        user.save()
        return redirect("supplier-team-leads", supplier.id)


def change_supplier_team_leads_disable_status_view(request, supplier_id, user_id):
    if request.method == "GET":
        supplier = models.Supplier.objects.get(pk=supplier_id)
        user = models.User.objects.get(pk=user_id)
        return render(
            request, "supplier-admin/disable-team-lead-confirmation.html", {"supplier": supplier, "user": user}
        )
    else:
        user = models.User.objects.get(pk=user_id)
        user.is_active = not user.is_active
        user.save()
        return redirect("supplier-team-leads", supplier_id)


def team_member_add_role_view(request, supplier_id):
    if request.method == "GET":
        return render(request, "team-leader/add-user-role-select.html", {"supplier_id": supplier_id})
    else:
        user_role = request.POST.get("team-role")
        return redirect("add-user-details-select", user_role=user_role, supplier_id=supplier_id)


def team_member_add_details_view(request, supplier_id, user_role):
    if request.method == "GET":
        return render(
            request, "team-leader/add-user-details.html", {"user_role": user_role, "supplier_id": supplier_id}
        )
    else:
        supplier = models.Supplier.objects.get(pk=supplier_id)
        user_name = request.POST.get("user-name")
        user_email = request.POST.get("user-email")

        user, _ = models.User.objects.get_or_create(email=user_email)
        user.full_name = user_name
        if user_role == "team-leader":
            user.is_team_leader = True
        else:
            user.is_team_member = True
        user.supplier = supplier
        user.save()
        return redirect("homepage")


def team_member_details_view(request, supplier_id, user_id):
    user = models.User.objects.get(pk=user_id)
    return render(request, "team-leader/view-user-details.html", {"supplier_id": supplier_id, "user": user})


def team_member_remove_view(request, supplier_id, user_id):
    if request.method == "GET":
        user = models.User.objects.get(pk=user_id)
        return render(request, "team-leader/remove-user.html", {"supplier_id": supplier_id, "user": user})
    else:
        user = models.User.objects.get(pk=user_id)
        user.is_active = False
        user.save()
        return redirect("homepage")
