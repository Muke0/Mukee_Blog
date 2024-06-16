# 操作系统
## 实验2
openeuler编译内核时遇到问题：
```
make install
```
```
FAILED:  /usr/lib/dracut/dracut-install -D /var/tmp/dracc ut.oQEgmk/initramfs --kerneldir /lib/modules/4.19.90-2003.4.0.0036.oe1.x86_64/ -m virtio_gpu   xen-blkfront xen-netfront virtio_blk virtio_scsi virtio_net virtio_pci virtio_ring virtio
```
解决方法：修改/etc/dracut.conf.d/virtdriver.conf为
```
add_drivers+=""
```
update-grub2找不到命令,换成
```
grub2-mkconfig -o /boot/efi/EFI/openEuler/grub.cfg
```