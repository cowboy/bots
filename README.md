# bots

## Deployment

### Setting up a new server

1. Log into Digital Ocean and [create a droplet](https://cloud.digitalocean.com/droplets/new?size=512mb&region=nyc3&distro=ubuntu&distroImage=ubuntu-14-04-x64).
2. Add SSH key.
3. Set Hostname to `bots`.
4. Click the "Create" button.
5. [Assign the floating IP](https://cloud.digitalocean.com/networking#actions-floating-ip)
   `138.197.63.241` to the new `bots` droplet.
6. Run `./deploy/run-playbook.sh init production --ask-vault-pass` and enter the
   password used to encrypt the vault file(s).

### Deploying

1. Ensure latest code is pushed to master.
2. Run `./deploy/run-playbook.sh deploy production`
